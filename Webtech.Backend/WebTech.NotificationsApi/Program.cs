var builder = WebApplication.CreateSlimBuilder(args);
var identityClaimsSub = builder.Configuration.GetValue<string>("IdentityClaims:Sub");

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddSingleton<NotificationService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddAppAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddSignalR();
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapHub<NotificationHub>("notifications");

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("PostMessage", async (string userId, IHubContext<NotificationHub> hubContext) =>
{
    await hubContext.Clients.User(userId).SendAsync("ReceiveNotification");
    return Results.Ok();
});

app.MapGet("api/NotificationAPI/GetNotifications", 
    [Authorize] async (NotificationService notificationService, HttpContext context) =>
{
    var userId = GetUserId(context.User);
    var result = await notificationService.GetAsync(userId!);

    return Results.Ok(result.Notifications.OrderByDescending(x => x.Date));
});

app.MapGet("api/NotificationAPI/GetCountNotifications",
    [Authorize] async (NotificationService notificationService, HttpContext context) =>
{
    var userId = GetUserId(context.User);
    var result = await notificationService.GetAsync(userId!);
        
    return Results.Ok(result.Notifications.Count(x => x.Checked == false));
});

app.MapPost("api/NotificationAPI/MarkNotificationsAsRead", 
    [Authorize] async (NotificationService notificationService, HttpContext context) =>
{
    var authorId = GetUserId(context.User);
    await notificationService.MarkNotificationsAsRead(authorId!);
        
    return Results.Ok();
});

app.MapPost("api/NotificationAPI/AddNotification/{authorId}",
    [Authorize] async (NotificationService notificationService, HttpContext context, [FromBody] NotificationBody notificationBody, string authorId) =>
{
    notificationBody.UserName = GetUserName(context.User);
    notificationBody.Date = DateTime.Now.ToLongDateString() + " " + DateTime.Now.ToShortTimeString();
    notificationBody.Checked = false;
        
    var notificationAuthor = await notificationService.GetAsync(authorId);
    if (notificationAuthor == null)
        await notificationService.CreateAsync(authorId);
        
    await notificationService.AddNotification(notificationBody, authorId);
        
    return Results.Created();
});

string? GetUserId(ClaimsPrincipal user) => user.Claims.Where(x => x.Type == identityClaimsSub)?.FirstOrDefault()?.Value;

string? GetUserName(ClaimsPrincipal user) => user.Claims.Where(x => x.Type == "name")?.FirstOrDefault()?.Value;

app.Run();
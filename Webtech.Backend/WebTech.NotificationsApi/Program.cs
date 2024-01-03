using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.OpenApi.Models;
using WebTech.NotificationsApi;
using WebTech.NotificationsApi.Data;
using WebTech.NotificationsApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebTech.NotificationsApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddSingleton<NotificationService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(name:"Bearer", securityScheme: new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter the Bearer Authorization string as following: 'Bearer Generated-JWT-Token'",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference()
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                }
            }, new string[]{}
        }
    });
});

builder.AddAppAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

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
        
        return Results.Ok(result.Notifications);
    });


//TODO ПЕРЕДЕЛАТЬ 
app.MapGet("api/NotificationAPI/GetCountNotifications",
    [Authorize] async (NotificationService notificationService, HttpContext context) =>
    {
        var userId = GetUserId(context.User);
        var result = await notificationService.GetAsync(userId!);

        return Results.Ok(result.Notifications.Count());
    });

app.MapPost("api/NotificationAPI/AddNotification/{authorId}",
    [Authorize] async (NotificationService notificationService, HttpContext context, [FromBody] NotificationBody notificationBody, string authorId) =>
    {
        notificationBody.UserName = GetUserName(context.User);
        notificationBody.Date = DateTime.Now.ToLongDateString() + " " + DateTime.Now.ToShortTimeString();
        notificationBody.Checked = false;
        
        var notificationAuthor = await notificationService.GetAsync(authorId);

        if (notificationAuthor == null)
            await CreateNotificationsForAuthor(authorId, notificationService);
        
        await notificationService.AddNotification(notificationBody, authorId);
        
        return Results.Ok();
    });

string? GetUserId(ClaimsPrincipal user) =>
    user.Claims.Where(x => x.Type == IdentityClaims.Sub)?.FirstOrDefault()?.Value;

string? GetUserName(ClaimsPrincipal user) =>
    user.Claims.Where(x => x.Type == "name")?.FirstOrDefault()?.Value;

//TODO ВЫНЕСТИ ЭТО В СЕРВИС
async Task CreateNotificationsForAuthor(string authorId, NotificationService notificationService)
{
    Notification notification = new() { AuthorId = authorId! };
    await notificationService.CreateAsync(notification);
}

app.Run();
var builder = WebApplication.CreateSlimBuilder(args);

var identityClaimsSub = builder.Configuration.GetValue<string>("IdentityClaims:Sub");

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddSingleton<UserService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddAppAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("api/FeedbackApi/GetAllFeedBackUsers",
    async (UserService userService) => Results.Ok(await userService.GetAllAsync()));

app.MapGet("api/FeedbackApi/GetUser/{userId}",
    async (UserService userService, string userId) =>
        Results.Ok(await userService.GetAsync(userId)));

app.MapGet("api/FeedbackApi/GetUserFeedbackArticle/{bodyId}",
    [Authorize] async (UserService userService, HttpContext context, string bodyId) =>
    {
        var user = await userService.GetAsync(GetUserId(context.User)!);

        bool statusLiked = user.LikedNews.Contains(bodyId.ToString());
        bool statusDisliked = user.DislikedNews.Contains(bodyId.ToString());

        var json = new { Like = statusLiked, Dislike = statusDisliked };

        return Results.Json(json);
    });

app.MapPost("api/FeedbackApi/RemoveLike/{bodyId}",
    [Authorize] async (UserService userService, HttpContext context, string bodyId) =>
        Results.Ok(await userService.RemoveLikeAsync(GetUserId(context.User), bodyId)));

app.MapPost("api/FeedbackApi/RemoveDislike/{bodyId}",
    [Authorize] async (UserService userService, HttpContext context, string bodyId) =>
        Results.Ok(await userService.RemoveDislikeAsync(GetUserId(context.User), bodyId)));

app.MapPost("api/FeedbackApi/AddLike/{bodyId}",
    [Authorize] async (UserService userService, HttpContext context, string bodyId) =>
    {
        var userId = GetUserId(context.User);
        var feedbackUser = await userService.GetAsync(userId!);

        if (feedbackUser == null)
            await userService.CreateAsync(userId!);

        await userService.RemoveDislikeAsync(userId, bodyId);
        await userService.AddLikeAsync(userId!, bodyId);
        return Results.Ok();
    });

app.MapPost("api/FeedbackApi/AddDislike/{bodyId}",
    [Authorize] async (UserService userService, HttpContext context, string bodyId) =>
    {
        var userId = GetUserId(context.User);
        var feedbackUser = await userService.GetAsync(userId!);

        if (feedbackUser == null)
            await userService.CreateAsync(userId!);

        await userService.RemoveLikeAsync(userId, bodyId);
        await userService.AddDislikeAsync(userId!, bodyId);
        return Results.Ok();
    });

app.MapDelete("api/FeedbackApi/DeleteById/{userId}",
    async (UserService userService, string userId) =>
    {
        await userService.RemoveAsync(userId);
        Results.Ok();
    });

string? GetUserId(ClaimsPrincipal user) => user.Claims.Where(x => x.Type == identityClaimsSub)?.FirstOrDefault()?.Value;

app.Run();
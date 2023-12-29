using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using WebTech.FeedbackAPI.Data;
using WebTech.FeedbackAPI.Extensions;
using WebTech.FeedbackAPI.Models;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddSingleton<UserService>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(name: "Bearer", securityScheme: new OpenApiSecurityScheme
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
            },
            new string[] { }
        }
    });
});

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
            await AddFeedBackUser(userId!, userService);

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
            await AddFeedBackUser(userId!, userService);

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

string? GetUserId(ClaimsPrincipal user) =>
    user.Claims.Where(x => x.Type == IdentityClaims.Sub)?.FirstOrDefault()?.Value;

//TODO ВЫНЕСТИ ЭТО В СЕРВИС
async Task AddFeedBackUser(string userId, UserService userService)
{
    FeedbackUser feedbackUser = new() { Id = userId! };
    await userService.CreateAsync(feedbackUser);
}
app.Run();
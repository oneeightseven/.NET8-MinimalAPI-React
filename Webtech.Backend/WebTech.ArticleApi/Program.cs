using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using WebTech.ArticleApi.Data;
using WebTech.ArticleApi.Extensions;
using WebTech.ArticleApi.Models.Dto;
using WebTech.ArticleApi.Service;
using WebTech.ArticleApi.Service.IService;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddSingleton<UserService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpClient("Feedback", x => x.BaseAddress = new Uri(builder.Configuration["ServiceUrls:FeedbackAPI"]!));
builder.Services.AddScoped<IFeedbackService, FeedbackService>();

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("api/ArticleApi/GetHeaders", async (ApplicationDbContext context) =>
{
    try
    {
        var result = await context.ArticleHeaders.ToListAsync();
        return Results.Ok(result);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex);
    }
});

app.MapGet("api/ArticleApi/GetBody/{bodyId}", async (ApplicationDbContext context, int bodyId) =>
{
    try
    {
        ArticleDto article = new()
        {
            ArticleBody = await context.ArticleBodies.FirstOrDefaultAsync(x => x.Id == bodyId),
            ArticleHeader = await context.ArticleHeaders.FirstOrDefaultAsync(x => x.ArticleBodyId == bodyId)
        };
        return Results.Ok(article);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex);
    }
});

app.MapGet("api/ArticleApi/GetUserFeedbackLikeArticles", [Authorize] async (ApplicationDbContext context, IFeedbackService feedbackService, HttpContext httpContext) =>
{
    var user = await feedbackService.GetUser(GetUserId(httpContext.User)!);
    var articles = await context.ArticleHeaders.Where(e => user.LikedNews.Contains(e.ArticleBodyId.ToString())).ToListAsync();
    return Results.Ok(articles);
});

app.MapGet("api/ArticleApi/GetUserFeedbackById", [Authorize] async (ApplicationDbContext context, IFeedbackService feedbackService, HttpContext httpContext) =>
{
    var user = GetUserId(httpContext.User);

    var articles = await context.ArticleHeaders.Where(x => x.AuthorId == user).ToListAsync();
    
    return Results.Ok(articles);
});

app.MapGet("api/ArticleApi/GetUserFeedbackDislikeArticles", [Authorize] async (ApplicationDbContext context, IFeedbackService feedbackService, HttpContext httpContext) =>
{
    var user = await feedbackService.GetUser(GetUserId(httpContext.User)!);
    var articles = await context.ArticleHeaders.Where(e => user.DislikedNews.Contains(e.ArticleBodyId.ToString())).ToListAsync();
    return Results.Ok(articles);
});

app.MapPost("api/ArticleApi/CreateArticle", [Authorize] async (ApplicationDbContext context, ArticleDto articleDto, HttpContext httpContext) =>
{
    try
    {
        articleDto.ArticleHeader!.Date = DateTime.Today;
        articleDto.ArticleHeader.ArticleBody = articleDto.ArticleBody;
        articleDto.ArticleHeader.AuthorId = GetUserId(httpContext.User)!;

        await context.AddRangeAsync(articleDto.ArticleBody!, articleDto.ArticleHeader);
        await context.SaveChangesAsync();
        return Results.Ok();
    }
    catch (Exception exception)
    {
        return Results.BadRequest(exception);
    }
});

app.MapPost("api/ArticleApi/IncrementArticleView/{bodyId}", async (ApplicationDbContext context, int bodyId) =>
    Results.Ok(await context.ArticleHeaders.Where(x => x.ArticleBodyId == bodyId)
        .ExecuteUpdateAsync(s => s.SetProperty(x => x.Views, x => x.Views + 1))));

app.MapPost("api/ArticleApi/IncrementLikeArticle/{bodyId}", [Authorize] async (ApplicationDbContext context, int bodyId) =>
    Results.Ok(await context.ArticleHeaders.Where(x => x.ArticleBodyId == bodyId)
        .ExecuteUpdateAsync(s => s.SetProperty(x => x.Likes, x => x.Likes + 1))));

app.MapPost("api/ArticleApi/DecrementLikeArticle/{bodyId}", [Authorize] async (ApplicationDbContext context, int bodyId) =>
    Results.Ok(await context.ArticleHeaders.Where(x => x.ArticleBodyId == bodyId)
        .ExecuteUpdateAsync(s => s.SetProperty(x => x.Likes, x => x.Likes - 1))));

app.MapPost("api/ArticleApi/IncrementDislikeArticle/{bodyId}", [Authorize] async (ApplicationDbContext context, int bodyId) =>
    Results.Ok(await context.ArticleHeaders.Where(x => x.ArticleBodyId == bodyId)
        .ExecuteUpdateAsync(s => s.SetProperty(x => x.Dislikes, x => x.Dislikes + 1))));

app.MapPost("api/ArticleApi/DecrementDislikeArticle/{bodyId}", [Authorize] async (ApplicationDbContext context, int bodyId) =>
    Results.Ok(await context.ArticleHeaders.Where(x => x.ArticleBodyId == bodyId)
        .ExecuteUpdateAsync(s => s.SetProperty(x => x.Dislikes, x => x.Dislikes - 1))));

string? GetUserId(ClaimsPrincipal user) =>
    user.Claims.Where(x => x.Type == IdentityClaims.Sub)?.FirstOrDefault()?.Value;

app.Run();
var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("ApiSettings:JwtOptions"));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("api/AuthAPI/login", async ([FromBody] LoginRequest model, IAuthService authService) =>
{
    var loginResponse = await authService.Login(model);
        
    if (loginResponse.User == null)
        return Results.BadRequest();
        
    return Results.Ok(loginResponse);
});

app.MapPost("api/AuthAPI/Registration", async ([FromBody] RegistrationRequest model, IAuthService authService) =>
{
    var registrationResponse = await authService.Register(model);
        
    if (registrationResponse != "Succeeded")
        return Results.BadRequest();
        
    var loginResponse = await authService.AssignRole(model.Email!, "CUSTOMER");
        
    if (!loginResponse)
        return Results.BadRequest();
        
    return Results.Ok();
});

app.Run();
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddOcelot();

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseOcelot().Wait();

app.Run();
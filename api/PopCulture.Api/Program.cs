using Microsoft.EntityFrameworkCore;
using PopCulture.Api.Data;
using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options
      .UseNpgsql(builder.Configuration.GetConnectionString("Default"))
      .EnableSensitiveDataLogging()          // mostra parâmetros
      .LogTo(Console.WriteLine)              // loga tudo no console
);

// 2) Controllers e Swagger/OpenAPI
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")  // o URL onde o CRA roda
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// 3) Swagger somente em dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
// 4) Mapeia todas as rotas dos ApiControllers
app.MapControllers();

app.Run();

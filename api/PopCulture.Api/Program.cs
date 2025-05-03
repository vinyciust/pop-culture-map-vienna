using Microsoft.EntityFrameworkCore;
using PopCulture.Api.Data;

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

var app = builder.Build();

// 3) Swagger somente em dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 4) Mapeia todas as rotas dos ApiControllers
app.MapControllers();

app.Run();

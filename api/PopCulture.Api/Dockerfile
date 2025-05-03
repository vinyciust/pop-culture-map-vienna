# build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PopCulture.Api.csproj", "./"]
RUN dotnet restore "./PopCulture.Api.csproj"
COPY . .
RUN dotnet publish "PopCulture.Api.csproj" -c Release -o /app/publish

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "PopCulture.Api.dll"]

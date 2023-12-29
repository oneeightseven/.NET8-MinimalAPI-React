FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WebTech.ArticleApi/WebTech.ArticleApi.csproj", "WebTech.ArticleApi/"]
RUN dotnet restore "WebTech.ArticleApi/WebTech.ArticleApi.csproj"
COPY . .
WORKDIR "/src/WebTech.ArticleApi"
RUN dotnet build "WebTech.ArticleApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebTech.ArticleApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebTech.ArticleApi.dll"]

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WebTech.AuthAPI/WebTech.AuthAPI.csproj", "WebTech.AuthAPI/"]
RUN dotnet restore "WebTech.AuthAPI/WebTech.AuthAPI.csproj"
COPY . .
WORKDIR "/src/WebTech.AuthAPI"
RUN dotnet build "WebTech.AuthAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebTech.AuthAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebTech.AuthAPI.dll"]

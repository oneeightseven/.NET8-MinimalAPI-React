FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WebTech.Gateway/WebTech.Gateway.csproj", "WebTech.Gateway/"]
RUN dotnet restore "WebTech.Gateway/WebTech.Gateway.csproj"
COPY . .
WORKDIR "/src/WebTech.Gateway"
RUN dotnet build "WebTech.Gateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebTech.Gateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebTech.Gateway.dll"]

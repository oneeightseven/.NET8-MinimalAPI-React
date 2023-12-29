using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebTech.NotificationsApi.Service;

[Authorize]
public sealed class NotificationHub : Hub
{
    public async Task GetString()
    {
        await Clients.User("").SendAsync("ReceiveNotification");
    }  
}
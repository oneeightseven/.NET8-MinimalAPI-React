using MongoDB.Bson.Serialization.Attributes;

namespace WebTech.NotificationsApi.Models;
public class Notification
{
    [BsonId] 
    public string? AuthorId { get; set; }
    [BsonElement("Notifications")] 
    public List<NotificationBody> Notifications { get; set; } = new();
}
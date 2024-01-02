using MongoDB.Bson.Serialization.Attributes;

namespace WebTech.NotificationsApi.Models;

public class Notification
{
    [BsonId] 
    public string? AuthorId { get; set; }
    [BsonElement("UnreviewedNotifications")] 
    public List<string> UnreviewedNotifications { get; set; } = new();
}
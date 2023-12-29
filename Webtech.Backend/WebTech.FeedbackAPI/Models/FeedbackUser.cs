using MongoDB.Bson.Serialization.Attributes;

namespace WebTech.FeedbackAPI.Models;

public class FeedbackUser
{
    [BsonId] 
    public string? Id { get; set; }

    [BsonElement("LikedNews")] 
    public List<string> LikedNews { get; set; } = new();

    [BsonElement("DislikedNews")] 
    public List<string> DislikedNews { get; set; } = new();
}
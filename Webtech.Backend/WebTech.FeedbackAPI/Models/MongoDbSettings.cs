namespace WebTech.FeedbackAPI.Models;

public class MongoDbSettings
{
    public string? ConnectionSrting { get; set; } = "mongodb://localhost:27017";
    public string? Database { get; set; } = "WebTech";
    public string? CollectionName { get; set; } = "Users";
}
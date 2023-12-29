namespace WebTech.NotificationsApi.Models;

public class Notification
{
    public string? ArticleId { get; set; }
    public string? AuthorId { get; set; }
    public string? UserLiked { get; set; }
    public DateTime? Timestamp { get; set; }
}
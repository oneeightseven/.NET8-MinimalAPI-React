namespace WebTech.NotificationsApi.Models;
public class NotificationBody
{
    public string? Date { get; set; }
    public string? UserName { get; set; }
    public int ArticleId { get; set; }
    public string? ArticleTitle { get; set; }
    public bool Checked { get; set; }
}



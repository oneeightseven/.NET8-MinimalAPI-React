namespace WebTech.ArticleApi.Models;

[Table("ArticleBodies")]
public class ArticleBody
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string? Body { get; set; }
    public string? ImageUrl1 { get; set; }
    public string? ImageUrl2 { get; set; }
    public string? ImageUrl3 { get; set; }
}
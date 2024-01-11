namespace WebTech.ArticleApi.Models;

[Table("ArticleHeaders")]
public class ArticleHeader
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string? Title { get; set; }
    [Required]
    public string? Header { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime Date { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public int Views { get; set; }
    public int ReadingTime { get; set; }
    [ForeignKey("ArticleBodyId")]
    public int ArticleBodyId { get; set; }
    public ArticleBody? ArticleBody { get; set; }
    public string AuthorId { get; set; }
}
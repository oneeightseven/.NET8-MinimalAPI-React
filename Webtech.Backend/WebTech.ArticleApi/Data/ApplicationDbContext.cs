namespace WebTech.ArticleApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    public DbSet<ArticleHeader> ArticleHeaders { get; set; }
    public DbSet<ArticleBody> ArticleBodies { get; set; }
}
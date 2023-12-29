using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTech.ArticleApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateArticleHeader : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Dislikes",
                table: "ArticleHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "ArticleHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dislikes",
                table: "ArticleHeaders");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "ArticleHeaders");
        }
    }
}

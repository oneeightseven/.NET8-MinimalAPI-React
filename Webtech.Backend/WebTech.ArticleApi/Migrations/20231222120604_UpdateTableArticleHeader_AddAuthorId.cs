using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTech.ArticleApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableArticleHeader_AddAuthorId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthorId",
                table: "ArticleHeaders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "ArticleHeaders");
        }
    }
}

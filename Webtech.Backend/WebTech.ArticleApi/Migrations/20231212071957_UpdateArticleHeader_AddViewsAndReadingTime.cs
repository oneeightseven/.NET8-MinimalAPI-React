using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTech.ArticleApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateArticleHeader_AddViewsAndReadingTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReadingTime",
                table: "ArticleHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "ArticleHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReadingTime",
                table: "ArticleHeaders");

            migrationBuilder.DropColumn(
                name: "Views",
                table: "ArticleHeaders");
        }
    }
}

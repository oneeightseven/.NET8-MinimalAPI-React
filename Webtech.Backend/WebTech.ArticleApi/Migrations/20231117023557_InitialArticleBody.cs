using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTech.ArticleApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialArticleBody : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArticleBodyId",
                table: "ArticleHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArticleBodies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl3 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleBodies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleHeaders_ArticleBodyId",
                table: "ArticleHeaders",
                column: "ArticleBodyId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleHeaders_ArticleBodies_ArticleBodyId",
                table: "ArticleHeaders",
                column: "ArticleBodyId",
                principalTable: "ArticleBodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleHeaders_ArticleBodies_ArticleBodyId",
                table: "ArticleHeaders");

            migrationBuilder.DropTable(
                name: "ArticleBodies");

            migrationBuilder.DropIndex(
                name: "IX_ArticleHeaders_ArticleBodyId",
                table: "ArticleHeaders");

            migrationBuilder.DropColumn(
                name: "ArticleBodyId",
                table: "ArticleHeaders");
        }
    }
}

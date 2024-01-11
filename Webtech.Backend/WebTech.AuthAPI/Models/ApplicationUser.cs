namespace WebTech.AuthAPI.Models;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }
}
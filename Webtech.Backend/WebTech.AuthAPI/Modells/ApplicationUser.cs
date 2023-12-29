using Microsoft.AspNetCore.Identity;

namespace WebTech.AuthAPI.Modells;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }
}
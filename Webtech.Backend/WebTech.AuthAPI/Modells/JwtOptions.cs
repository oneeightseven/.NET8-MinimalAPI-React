namespace WebTech.AuthAPI.Modells;

public class JwtOptions
{
    public string? Issuer { get; set; } 
    public string? Audience { get; set; } 
    public string? Secret { get; set; } 
}
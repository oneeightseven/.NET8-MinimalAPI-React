namespace WebTech.AuthAPI.Modells;

public class LoginResponse
{
    public User? User { get; set; }
    public string? Token { get; set; }
}
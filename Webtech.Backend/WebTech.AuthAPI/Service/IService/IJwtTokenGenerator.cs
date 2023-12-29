using WebTech.AuthAPI.Modells;

namespace WebTech.AuthAPI.Service.IService;

public interface IJwtTokenGenerator
{
    string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> roles);
}
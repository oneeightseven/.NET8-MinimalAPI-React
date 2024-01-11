namespace WebTech.AuthAPI.Service;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager, IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _roleManager = roleManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<string> Register(RegistrationRequest registrationRequest)
    {
        ApplicationUser user = new()
        {
            UserName = registrationRequest.Email,
            Email = registrationRequest.Email,
            NormalizedEmail = registrationRequest.Email!.ToUpper(),
            Name = registrationRequest.Name,
            PhoneNumber = registrationRequest.PhoneNumber
        };
        try
        {
            var result = await _userManager.CreateAsync(user, registrationRequest.Password!);
            if (result.Succeeded)
            {
                await _dbContext.ApplicationUsers.FirstOrDefaultAsync(x =>
                    x.UserName == registrationRequest.Email);
                return "Succeeded";
            }
            else
                return result.Errors.FirstOrDefault()!.Description;
        }
        catch (Exception ex)
        {
            return "Invalid registration request" + ex.Message;
        }
    }

    public async Task<LoginResponse> Login(LoginRequest loginRequest)
    {
        var user = await _dbContext.ApplicationUsers.FirstOrDefaultAsync(x =>
            x.UserName!.ToLower() == loginRequest.UserName!.ToLower());
        bool isValid = await _userManager.CheckPasswordAsync(user!, loginRequest.Password!);

        if (user == null || isValid == false)
            return new LoginResponse() { User = null, Token = "" };

        var userRole = await _userManager.GetRolesAsync(user);

        User userDto = new()
        {
            Email = user.Email,
            Id = user.Id,
            Name = user.Name,
            PhoneNumber = user.PhoneNumber,
            Role = userRole.First()
        };
        var token = _jwtTokenGenerator.GenerateToken(user, userRole);

        return new LoginResponse()
        {
            User = userDto,
            Token = token
        };
    }

    public async Task<bool> AssignRole(string email, string rolename)
    {
        var user = await _dbContext.ApplicationUsers.FirstOrDefaultAsync(x => x.Email!.ToLower() == email.ToLower());
        if (user != null)
        {
            if (!_roleManager.RoleExistsAsync(rolename).GetAwaiter().GetResult())
                _roleManager.CreateAsync(new IdentityRole(rolename)).GetAwaiter().GetResult();

            await _userManager.AddToRoleAsync(user, rolename);
            return true;
        }

        return false;
    }
}
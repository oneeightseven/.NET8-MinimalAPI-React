using WebTech.ArticleApi.Models;
using WebTech.ArticleApi.Service.IService;
using Newtonsoft.Json;

namespace WebTech.ArticleApi.Service;

public class FeedbackService : IFeedbackService
{
    private readonly IHttpClientFactory _httpClient;

    public FeedbackService(IHttpClientFactory httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<FeedbackUser> GetUser(string userId)
    {
        var client = _httpClient.CreateClient("Feedback");
        
        var response = await client.GetAsync($"/api/FeedbackApi/GetUser/{userId}");
        
        var apiContent = await response.Content.ReadAsStringAsync();
        
        return JsonConvert.DeserializeObject<FeedbackUser>(apiContent!)!;
    }
}
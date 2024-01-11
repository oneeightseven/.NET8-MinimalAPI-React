namespace WebTech.ArticleApi.Service.IService;

public interface IFeedbackService
{
    Task<FeedbackUser> GetUser(string userId);
}
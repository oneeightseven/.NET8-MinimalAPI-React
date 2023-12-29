using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WebTech.FeedbackAPI.Data;
using WebTech.FeedbackAPI.Models;

namespace WebTech.FeedbackAPI.Extensions;

public class UserService
{
    private readonly IMongoCollection<FeedbackUser> _usersCollection;

    public UserService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionSrting);
        var mongoDb = mongoClient.GetDatabase(mongoDbSettings.Value.Database);
        _usersCollection = mongoDb.GetCollection<FeedbackUser>(mongoDbSettings.Value.CollectionName);
    }

    public async Task<List<FeedbackUser>> GetAllAsync() => await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<FeedbackUser> GetAsync(string id) => await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    
    public async Task CreateAsync(FeedbackUser user) => await _usersCollection.InsertOneAsync(user);

    public async Task RemoveAsync(string id) => await _usersCollection.DeleteOneAsync(x => x.Id == id);

    public async Task<UpdateResult> AddLikeAsync(string? userId, string newsId)
    {
        var filter = Builders<FeedbackUser>.Filter.Eq(u => u.Id, userId);
        var update = Builders<FeedbackUser>.Update.Push(u => u.LikedNews, newsId);
        return await _usersCollection.UpdateOneAsync(filter, update);
    }

    public async Task<UpdateResult> AddDislikeAsync(string? userId, string newsId)
    {
        var filter = Builders<FeedbackUser>.Filter.Eq(u => u.Id, userId);
        var update = Builders<FeedbackUser>.Update.Push(u => u.DislikedNews, newsId);
        return await _usersCollection.UpdateOneAsync(filter, update);
    }
    
    public async Task<UpdateResult> RemoveLikeAsync(string? userId, string newsId)
    {
        var filter = Builders<FeedbackUser>.Filter.Eq(u => u.Id, userId);
        var update = Builders<FeedbackUser>.Update.Pull(u => u.LikedNews, newsId);
        return await _usersCollection.UpdateOneAsync(filter, update);
    }
    
    public async Task<UpdateResult> RemoveDislikeAsync(string? userId, string newsId)
    {
        var filter = Builders<FeedbackUser>.Filter.Eq(u => u.Id, userId);
        var update = Builders<FeedbackUser>.Update.Pull(u => u.DislikedNews, newsId);
        return await _usersCollection.UpdateOneAsync(filter, update);
    }

} 
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WebTech.NotificationsApi.Data;
using WebTech.NotificationsApi.Models;

namespace WebTech.NotificationsApi.Service;

public class NotificationService
{
    private readonly IMongoCollection<Notification> _notificationsCollection;

    public NotificationService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionSrting);
        var mongoDb = mongoClient.GetDatabase(mongoDbSettings.Value.Database);
        _notificationsCollection = mongoDb.GetCollection<Notification>(mongoDbSettings.Value.CollectionName);
    }
    
    public async Task<List<Notification>> GetAllAsync() => await _notificationsCollection.Find(_ => true).ToListAsync();
    
    public async Task<Notification> GetAsync(string id) => await _notificationsCollection.Find(x => x.AuthorId == id).FirstOrDefaultAsync();
    
    public async Task CreateAsync(Notification notification) => await _notificationsCollection.InsertOneAsync(notification);

    public async Task<UpdateResult> AddNotification(string authorId, string notification)
    {
        var filter = Builders<Notification>.Filter.Eq(u => u.AuthorId, authorId);
        var update = Builders<Notification>.Update.Push(u => u.UnreviewedNotifications, notification);
        return await _notificationsCollection.UpdateOneAsync(filter, update);
    }
}
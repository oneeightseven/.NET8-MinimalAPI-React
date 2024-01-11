namespace WebTech.NotificationsApi.Service;

public class NotificationService
{
    private readonly IMongoCollection<Notification> _notificationsCollection;

    public NotificationService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
        var mongoDb = mongoClient.GetDatabase(mongoDbSettings.Value.Database);
        _notificationsCollection = mongoDb.GetCollection<Notification>(mongoDbSettings.Value.CollectionName);
    }
    
    public async Task<Notification> GetAsync(string id) => await _notificationsCollection.Find(x => x.AuthorId == id).FirstOrDefaultAsync();

    public async Task CreateAsync(string authorId)
    {
        Notification notification = new() { AuthorId = authorId! };
        
        await _notificationsCollection.InsertOneAsync(notification);
    } 

    public async Task MarkNotificationsAsRead(string authorId)
    {
        var filter = Builders<Notification>.Filter.Eq("AuthorId", authorId);
        var update = Builders<Notification>.Update.Set("Notifications.$[].Checked", true);
        
        await _notificationsCollection.UpdateManyAsync(filter, update);
    }

    public async Task AddNotification(NotificationBody notification, string authorId)
    {
        var filter = Builders<Notification>.Filter.Eq(u => u.AuthorId, authorId);
        var update = Builders<Notification>.Update.Push(u => u.Notifications, notification);
        
        await _notificationsCollection.UpdateOneAsync(filter, update);
    }
}
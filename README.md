<h2 align="center">Blog of articles using React and .NET</h2>
<h3 align="left">About the project</h3>

This site provides the opportunity to publish your articles, scientific works or news. 
Article authors can track user engagement with their articles. In your personal account, 
you can view the history of articles that were rated (like/dislike), or see a list of your articles.

In the notification history, you can get information about the likes of the article. 
Alerts are sent instantly using a web socket.

The web application consists of 5 APIs:
- Authentication API(JWT bearer).
- Article API, all CRUD operations of interaction with user articles.
- Feedback API, this api is responsible for all user activity related to articles.
- Notification API, well, this API already sends notifications to article authors.
- Well, a regular gateway using Ocelot.

![scheme](https://imagess.hb.ru-msk.vkcs.cloud/Пустой%20диаграммой.png)

<h3 align="left">Technology stack used on the server side</h3>

- .NET 8, EF 8, SignalR 7.
- MSSQL + mongoDB.
- Ocelot API Gateway.
- Minimal API with clean architecture.

<h3 align="left">Usage and Testing</h3>

- Clone the repository to your device.
- Download the missing ones json files {download link}.
- Change your database connection strings (inside json files).
- Now you can run .NET and React applications.

<h5 align="left">Thank you for reading to this line! Have a nice day 🥰</h5>

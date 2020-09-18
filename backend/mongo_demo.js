//basic db testing 
//db setup info from https://docs.mongodb.com/drivers/node/quick-start
//and db usage patterns from https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.aspvar 
MongoClient = require('mongodb').MongoClient;
var demo_password = "mongoDEMO"
//yes I am aware this is bad security practice
var cloud_url = "mongodb+srv://demoUser:" + demo_password + "@cluster0.gtdqw.mongodb.net/demoDB?retryWrites=true&w=majority"

//formatting of this code is per the convention in both tutorials above. 
MongoClient.connect(cloud_url, function(err, db) {
    if (err) throw err; 
    console.log("Database created!");
    var dbo = db.db("mongoDEMO");
    dbo.createCollection("greetings", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
     });
    db.close();
});
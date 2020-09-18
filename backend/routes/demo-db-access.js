//adapted from basic blueprint here: https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
var express = require('express');
var router = express.Router();

//db setup info from https://docs.mongodb.com/drivers/node/quick-start
//and db usage info from https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp
var MongoClient = require('mongodb').MongoClient;
var demo_password = "mongoDEMO"
var cloud_url = "mongodb+srv://demoUser:" + demo_password + "@cluster0.gtdqw.mongodb.net/demoDB?retryWrites=true&w=majority"


router.get('/', function(req, res) {
    MongoClient.connect(cloud_url, function(err, db) { 
        var this_db = db.db('demoDB');
        //learned how to get most recent from 
        //https://stackoverflow.com/questions/4421207/how-to-get-the-last-n-records-in-mongodb
        this_db.collection('greetings').find().sort({_id:-1}).limit(1).toArray(function(err, result) { 
            if (err) throw err;
            res.send(result[0]['Message']);
        });
        db.close();
    });
});

//not copied, but inspired by usage patterns
router.post('/', function(req, res) { 
    //usage mostly follows that of w3 schools tutorial above
    MongoClient.connect(cloud_url, function(err, db) { 
        var this_db = db.db('demoDB');
        this_db.collection('greetings').insertOne(req.body, function(err, res) { 
            if (err) throw err;
        });
        db.close();
    })
    res.send('Inserted record successfully');
});

module.exports = router;

const express = require('express'); 
const app = express(); 
const mongoClient = require('mongodb').MongoClient; // initializes the mongodb library and gets a client object 

mongoClient.connect("mongodb://omega.unasec.info:27017", function(err, client) { 

const collection = client.db('amazon').collection('reviews'); 
console.log("Welcome to mongoDB!..."); 
if (!err) {
    

//get review 
app.get('/review/:reviewid/', (req, res) => { 
collection.find({ }.pretty().limit(1)).toArray(function(err, result) { 
if (err) throw err; 
res.send(result); 
})});


//random reviews by stars 
app.get('/review/:n/:stars', (req, res) => { 
collection.find({review: {star_rating: 3} }.limit(1)).toArray(function(err, result) { 
if (err) throw err; 
res.send(result); 
})});


//random reviews by date 
app.get('/review/:n/:from_date/:to_date', (req, res) => { 
collection.find(({review: {date : ISODate("2014-03-30T00:00:00Z")} }).limit(1).skip(450).toArray(function(err, result) { 
if (err) throw err; 
res.send(result); 
}))});


//add review 
app.put('/reviews/:reviewid', (req, res) => { 
collection.insert({ 
"_id" : ObjectId("4G5H2W4R55T6"), 
"day" : 30, 
"marketplace" : "US", 
"customer_id" : "4445232", 
"vine" : "N", 
"verified_purchase" : "Y", 
"review" : { 
"id" : "T432WRE54G", 
"headline" : "It's ok", 
"body" : "For simple use, this computer is great, but it is somewhat slow", 
"star_rating" : 3, 
"date" : ISODate("2014-03-30T00:00:00Z") 
}, 
"product" : { 
"id" : "C0430IGLOS", 
"parent" : "555753777", 
"title" : "Electronics", 
"category" : "Computers" 
}, 
"votes" : { 
"helpful_votes" : 3, 
"total_votes" : 20 
}})});

} //if 
(function(err, result) { 
if (err) throw err; 
console.log(result); 
res.send(); 
});


//update review 
app.put('/server/review/:reviewid', (req, res) => { 
collection.update({_id : ObjectId("5bd0dcffe25a5350c21ff517")},{"verified_purchase" : "Y"})(function(err, result) { 
if (err) throw err; 
res.send("Review Updated"); 
})});


//delete review 
app.put('/server/review/:reviewid', (req, res) => { 
collection.delete({_id: ObjectId("2dfg45hfgd2398ij67")}).toArray(function(err, result){ 
if (err) throw err; 
console.log(result); 
res.send(result); 
res.send("Review Deleted"); 
})});


//average star review 
app.get('/review/:from/:to', (req, res) => { 
var db1 = db.db("amazon"); 
db1.collection("reviews").aggregate( { 
$unwind : "$review"}, {$group: { _id: $_id, AvgStar: { $avg: $review.star_rating } }} ).toArray(function(err, result) { 
if (err) throw err; 
res.send(result); 
db.close(); 
}) 
});


//average helpful votes 
app.get('/review/helpful/:prodid', (req, res) => { 
var db1 = db.db("amazon"); 
db1.collection("reviews").aggregate( { 
$unwind : "$votes"}, {$group: { _id: $_id, AvgVote: { $avg: $votes.helpful_votes } }} ).toArray(function(err, result) { 
if (err) throw err; 
res.send(result); 
db.close(); 
}) 
});


//average review info by category 
app.get('/review/info/:custid', (req, res) => { 
var db1 = db.db("amazon"); 
db1.collection("reviews").aggregate( { 
$unwind : "$product"}, {$group: { _id: $_id, AvgCategory: { $avg: $product.category } }} ).toArray(function(err, result) { 
if (err) throw err; 
res.send(result); 
db.close(); 
}) 
}); 

for(var i = 0; i < results.length; i++) { 
console.log(results[i])
};
});


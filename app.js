// call packages needed
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//app config


// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set port to :8080

//---------------------------------------------------------------
// DATABASE SETUP---- Hardcoded as of now/ setting db up later
//---------------------------------------------------------------

//---------------------------------------------------------------
// ROUTES FOR API----
//---------------------------------------------------------------
var router = express.Router(); // get express Router

// middleware to use for all requests
router.use(function(req, res, next) {
// logging
console.log('Something is happening.');
next(); // make sure we go to the next routes
});

// '/' Testing route @localhost/api
app.get('/', function(req, res) {
res.json({ message: 'YESS! welcome to my API! - Test 1 passes!' });
});

// '/' Testing route @localhost/api/reviews/:reviewsid
// adding temp reviews 001 and 002(all reviews from '/reviews') until db connection
app.get('/api/reviews', (req, res) => {
res.json([
{
id: 001,
review: "Love the service here!",
n: 001,
stars: 4,
from_date: 2012-01-01,
},
{
id: 002,
review: "Love and Hate this service here!",
n: 002,
stars: 2,
from_date: 2012-02-02,
},
{
id: 003,
review: "Hate the service here!",
n: 003,
stars: 4,
from_date: 2013-01-01,
}
])
})
//temp-testing with /api/reviews/:reviewid --- a review by id test call /reviews/:reviewid-002
app.get('/api/reviews/:reviewid', (req,res)=>{
res.json([
{
id: 002,
review: "Hate the service here!",
n: 002,
stars: 2,
from_date: 2012-02-02,
}
])
})

//temp-testing with /api/reviews/:n/:stars --- a review by id testing call /reviews/:n[001+003]/:stars[4]
app.get('/api/reviews/:n/:stars', (req,res)=>{
res.json([
{
n: [id[001 + 003]],
stars: 4,
}
])
});
//temp-testing with /api/reviews/:reviewid/:n/:from_date/:end_date --- a review by id testing call /reviews/:reviewid-003/:n-3/:stars-4
app.get('/api/reviews/:n/:from_date/:end_date', (req,res)=>{
res.json([
{
n: [id[001 + 002 + 003]],
from_date: 2013-01-01,
end_date: 2012-01-01,
}
])
})
//temp-testing with /api/reviews --- posting new review at reviews
app.post('/api/reviews', (req,res)=>{
res.json([
{
id: 004,
review: "Loving the service here!",
n: 004,
stars: 2,
from_date: 2013-02-02,
}
])
})
//temp-testing with /api/reviews --- updating review at reviews/reviewid{004}
app.put('/api/reviews', (req,res)=>{
res.json([
{
id: 004,
review: "The service here stinks!",
n: 004,
stars: 1,
from_date: 2013-02-03,
}
])
})
//temp-testing with /api/reviews --- deleting review at reviews/reviewid{004}
app.delete('/api/reviews', (req,res)=>{
res.json([
{
id: 004,
review: "The service here stinks!",
n: 004,
stars: 1,
from_date: 2013-02-03,
}
])
})

// REGISTER ROUTES -------
// /api is prefix...(all) routes
app.use('/api', router);
app.use('api/reviews', router);
app.use('api/reviews/:reviewid', router);
app.use('api/reviews/:n/:stars', router);
app.use('api/reviews/:n/:from_date/:end_date', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
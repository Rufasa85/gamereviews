var express = require('express');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// var allRoutes = require('./controllers');

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// app.use('/',allRoutes);

app.get('/',function(req,res){
    db.Review.findAll({
        include:[db.User]
    }).then(reviews=>{
        const reviewsJson=reviews.map(review=>review.toJSON())
        // for (let i = 0; i < reviews.length; i++) {
        //     const currentRev = reviews[i];
        //     reviewsJson.push(currentRev.toJSON())    
        // }
        console.log(reviewsJson);
        res.render("index",{
            reviews:reviewsJson
        });
    })
})
app.get('/profile/:id',function(req,res){
    db.User.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Review]
    }).then(user=>{
        const userJson = user.toJSON()
        console.log(userJson)
        res.render("profile",userJson);
    })
})

app.get('/api/users',function(req,res){
    db.User.findAll().then(users=>{
        res.json(users)
    })
})

app.get("/api/users/:id",function(req,res){
    db.User.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Review]
    }).then(user=>{
        res.json(user)
    })
})

app.post('/api/users',function(req,res){
    db.User.create({
        name:req.body.name,
        email:req.body.email
    }).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

app.put("/api/users/:id",function(req,res){
    db.User.update({
        name:req.body.name,
        email:req.body.email
    },{
        where:{
            id:req.params.id
        }
    }).then(updateUser=>{
        if(updateUser[0]===0){
            res.status(404).json(updateUser)
        }else {
            res.json(updateUser)
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

app.delete("/api/users/:id",function(req,res){
    db.User.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        if(data===0){
            res.status(404).json(data)
        }else {
            res.json(data)
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

app.get('/api/reviews',function(req,res){
    db.Review.findAll({
        include:[db.User]
    }).then(reviews=>{
        res.json(reviews)
    })
})

app.post('/api/reviews',function(req,res){
    db.Review.create({
        title:req.body.title,
        review:req.body.review,
        rating:req.body.rating,
        players:req.body.players,
        UserId:req.body.UserId
    }).then(newReview=>{
        res.json(newReview)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})




db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});
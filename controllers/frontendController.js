const express = require("express");
const router = express.Router();
const db = require("../models")

router.get('/',function(req,res){
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
router.get('/profile/:id',function(req,res){
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

module.exports = router;
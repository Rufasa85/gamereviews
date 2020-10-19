const express = require("express");
const router = express.Router();
const db = require("../models")

router.get('/',function(req,res){
    db.Review.findAll({
        include:[db.User]
    }).then(reviews=>{
        res.json(reviews)
    })
})

router.post('/',function(req,res){
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

module.exports = router;
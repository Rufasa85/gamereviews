const express = require("express");
const router = express.Router();
const db = require("../models")

router.get('/',function(req,res){
    db.User.findAll().then(users=>{
        res.json(users)
    })
})

router.get("/:id",function(req,res){
    db.User.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Review]
    }).then(user=>{
        res.json(user)
    })
})

router.post('/',function(req,res){
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

router.put("/:id",function(req,res){
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

router.delete("/:id",function(req,res){
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


module.exports = router;
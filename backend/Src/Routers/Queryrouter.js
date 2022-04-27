const Queryrouter = require('express').Router();
const mongoose = require("mongoose")
const Student=mongoose.model("Students")
const Query = mongoose.model("Queries")
const Classdata=mongoose.model("Class")
Queryrouter.post("/createquery", async (req, res) => {
    var {querybystudent,referredto, query,studentid,from } = req.body
    if (!querybystudent || !referredto || !query || !studentid || !from) {
        res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    let referredtodata=["tutor","staff","seniortutor","head","reps"]
    if(referredtodata.indexOf(referredto)==-1){
        res.status(400).json({
            message:"Invalid referredto"
        })
    }

    if (query.length==0){
        res.status(400).json({
            message:"Query cannot be empty"
        })
    }
    var studentdata={}
    var classdata={}
    var staffsdata=[]
    try{
        studentdata=await Student.findOne({_id:studentid})
        console.log(studentdata)
    }
    catch(err){
        return res.status(400).json({
            message:"No student found at error"
        })
    }
    if(!studentdata){
        return res.status(400).json({
            message:"No student found"
        })
    }
    try{
        console.log(studentdata.classid.toString())
        classdata=await Classdata.findOne({_id:studentdata.classid.toString()})
        console.log(classdata)
    }
    catch(err){
        return res.status(400).json({
            message:"No class found at error"
        })
    }
    if(!classdata){
        return res.status(400).json({
            message:"No class found"
        })
    }
  
    if(referredto=="tutor"){
        staffsdata=classdata.tutors
        console.log(staffsdata)
    }
    else if(referredto=="seniortutor"){
        staffsdata=[classdata.seniortutor]
    }
    else if(referredto=="reps"){
        staffsdata=classdata.reps
    }
    Query.create({querybystudent,referredto,from,query,studentid,to:staffsdata,answered:false}).then(query=>{
        res.status(201).json({
            message:"Query created successfully"
        })
    }
    ).catch(err=>{
        console.log(err)
        res.status(500).json({
            message:"An error occured"
        })
    })

})
Queryrouter.post("/getqueries",(req,res)=>{
    const {type,id}=req.body
    if (type=="Student"){
        Query.find({from:new mongoose.Types.ObjectId(id)}).then(queries=>{
            if(!queries){
                res.json({
                    message:"No queries found"
                })
            }
            else{
                res.json({
                    queries
                })
            }
        }).catch(err=>{
            res.json({
                message:"An error occured"
            })
        })
    }
    else if(type=="Staff"){
        console.log(id)
        Query.find({to:new mongoose.Types.ObjectId(id)}).then(queries=>{
            console.log(queries)
            if(!queries){
                res.json({
                    message:"No queries found"
                })
            }
            else{
                res.json({
                    queries
                })
            }
        }).catch(err=>{
            res.json({
                message:"An error occured"
            })
        })
    }
})
module.exports = Queryrouter
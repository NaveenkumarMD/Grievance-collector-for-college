const mongoose=require("mongoose")
const departmentrouter=require("express").Router()

const Departmentschema=mongoose.model("Department")
departmentrouter.post("/adddepartment",(req,res)=>{
    var {name,head}=req.body
    if(!name||!head){
        res.status(400).json({
            message:"Please fill all the fields"
        })
    }
    Departmentschema.findOne({name:name}).then(department=>{
        if(department){
            res.status(400).json({
                message:"Department already exists"
            })
        }
        else{
            Departmentschema.create({name,head}).then(department=>{
                res.status(201).json({
                    message:"Department created successfully"
                })
            }).catch(err=>{
                console.log(err)
                res.status(500).json({
                    message:"An error occured"
                })
            })
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            message:"An error occured"
        })
    })
})

module.exports=departmentrouter
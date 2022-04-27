const mongoose=require("mongoose")

const Schema=mongoose.Schema

const Studentschema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    year:{
        type:String,
        enum:['I','II','III','IV'],
        default:'I',
        required:true
    },
    department:{
        type:String,
        enum:["CSE","ECE","EEE","MECH","CIVIL","CHE","IT"],
        default:"MECH",
        required:true
    },
    rollno:{
        type:Number,
        unique:true,
        required:true
    },
    section:{
        type:String,
        enum:['I','II'],
        default:"I"
    },
    type:{
        type:String,
        enum:["dayscholar","hosteller"],
        default:"dayscholar"
    },
    classid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    }
    
})

mongoose.model("Students",Studentschema)
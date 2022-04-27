const mongoose=require("mongoose")

const Schema=mongoose.Schema

const StaffSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    regid:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
   mobile:{
       type:Number,
       required:true
   }
})
mongoose.model("Staffs",StaffSchema)
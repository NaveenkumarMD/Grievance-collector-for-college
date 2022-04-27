const mongoose=require('mongoose')
const Schema=mongoose.Schema
const QuerySchema=new Schema({
    querybystudent:{
        type:Boolean,
        required:true,
        default:true
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Students",
        required:true
    },
    anonymous:{
        type:Boolean,
        required:true,
        default:false
    },
    referredto:{
        type:String,
        required:true
    },
    to:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Staffs"
        }
    ],
    answer:[
        {
            type:String,
        }
    ],
    query:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    answered:{
        type:Boolean,
        required:true
    },
    
})
mongoose.model("Queries",QuerySchema)
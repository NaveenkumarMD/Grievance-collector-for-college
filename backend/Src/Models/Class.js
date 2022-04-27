const mongoose=require("mongoose")

const classSchema=new mongoose.Schema({
    year:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    reps:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Students"
        }
    ],
    tutors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Staffs"
        }
    ],
    seniortutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Staffs"
    }, 
    students:[            
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Students"
        }
    ]


})
mongoose.model("Class",classSchema)
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    head: {
        type: ObjectId,
        ref: "Staffs",
        required: true
    },    


})
mongoose.model("Department", departmentSchema)
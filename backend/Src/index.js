const express = require('express')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors=require("cors")
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.connect(
    process.env.MONGO_URI
)
    .then(() => {
        console.log("Successfully connected to mongodb")
    })
    .catch(err => {
        console.log("An error occured")
        console.log(err)
    })

const PORT = 5000 || process.env.PORT

require("./Models/Students")
require("./Models/Class")
require("./Models/Queries")
require("./Models/Staffs")
require("./Models/Departmentdata")

app.use(require("./Routers/Authrouter"))
app.use(require("./Routers/Queryrouter"))
app.use(require("./Routers/Classrouter"))
app.use(require("./Routers/Departmentrouter"))

app.listen(PORT, () => {
    console.log("App is running successfully at ", PORT)
})

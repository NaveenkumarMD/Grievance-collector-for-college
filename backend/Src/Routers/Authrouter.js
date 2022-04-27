const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Authrouter = require("express").Router()
const Students = mongoose.model("Students")
const Staffs = mongoose.model("Staffs")
const jwt = require("jsonwebtoken")


Authrouter.post("/studentsignup", (req, res) => {
    const { name, email, password, phone, year, department, rollno, section, type, classname,classid } = req.body
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Please fill all the fields"
        })
    } else {
        Students.findOne({ email: email })
            .then(student => {
                if (student) {
                    res.status(400).json({
                        message: "Email already exists"
                    })
                } else {
                    const hashedpass = bcrypt.hashSync(password, 10)
                    Students.create({ name, email, password: hashedpass, phone, year, department, rollno, section, type,classid:classid })
                        .then(student => {
                            res.status(201).json({
                                message: "Student created successfully"
                            })
                        }
                        )
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                message: "An error occured"
                            })
                        }
                        )
                }
            }
            )
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "An error occured"
                })
            })
    }




})
Authrouter.post("/studentlogin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            message: "Please fill all the fields"
        })
    } else {
        Students.findOne({ email: email })
            .then(student => {
                if (!student) {
                    res.status(400).json({
                        message: "Email does not exist"
                    })
                } else {
                    if (bcrypt.compareSync(password, student.password)) {
                        const token = jwt.sign({ _id: student._id }, process.env.JWT_TOKEN_SECRET)
                        res.status(200).json({
                            message: "Login successful",
                            data: {
                                token,
                                ...student._doc
                            }
                        })
                    } else {
                        res.status(400).json({
                            message: "Password is incorrect"
                        })
                    }
                }
            }
            )
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "An error occured"
                })
            })
    }
})

Authrouter.post("/staffsignup", (req, res) => {
    const { name, email, password, qualification, regid, department, position, mobile } = req.body
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Please fill all the fields"
        })
    } else {
        Staffs.findOne({ email: email })
            .then(staff => {
                if (staff) {
                    res.status(400).json({
                        message: "Email already exists"
                    })
                } else {
                    const hashedpass = bcrypt.hashSync(password, 10)
                    Staffs.create({ name, email, password: hashedpass, qualification, regid, department, position, mobile })
                        .then(staff => {
                            res.status(201).json({
                                message: "Staff created successfully"
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                message: "An error occured"
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "An error occured"
                })
            })
    }


})
Authrouter.post("/stafflogin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            message: "Please fill all the fields"
        })
    } else {
        Staffs.findOne({ email: email })
            .then(staff => {
                if (!staff) {
                    res.status(400).json({
                        message: "Email does not exist"
                    })
                } else {
                    if (bcrypt.compareSync(password, staff.password)) {
                        const token = jwt.sign({ _id: staff._id }, process.env.JWT_TOKEN_SECRET)
                        res.status(200).json({
                            message: "Login successful",
                            data: {
                                token,
                                ...staff._doc
                            }
                        })
                    } else {
                        res.status(400).json({
                            message: "Password is incorrect"
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "An error occured"
                })
            })
    }

})

module.exports = Authrouter
const mongoose = require("mongoose")
const classrouter = require("express").Router()
const classschema = mongoose.model("Class")
classrouter.post("/addclass", (req, res) => {
    var { year, department, section, reps, tutors, seniortutor, students } = req.body
    if (!year || !department || !section || !reps || !tutors || !seniortutor) {
        res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    students = students.filter((v, i, a) => a.indexOf(v) === i)
    tutors = tutors.filter((v, i, a) => a.indexOf(v) === i)
    reps = reps.filter((v, i, a) => a.indexOf(v) === i)

    classschema.findOne({ year, department, section }).then(classs => {
        if (classs) {
            res.status(400).json({
                message: "Class already exists"
            })
        }
        else {
            classschema.create({ year, department, section, reps, tutors, seniortutor, students })
                .then(classs => {
                    res.status(201).json({
                        message: "Class created successfully"
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

})

module.exports = classrouter
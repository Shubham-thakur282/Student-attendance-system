const Students = require("../../models/student");
const bcrypt = require("bcrypt");


const addStudent = async(req,res)=>{
    try {
        const {enrollNo,rollNo,fName,lName,year,section,dob,email,courses,fatherName,motherName,parentsContact,password} = req.body;

        const studentExist = await Students.exists({enrollNo:enrollNo});
        if(studentExist){
            return res.status(409).send("Enrollment Number already exists");
        }

        const newPass = await bcrypt.hash(password,10);

        const student = await Students.create({
            enrollNo,
            rollNo,
            fName,
            lName,
            year,
            section,
            dob,
            email,
            courses,
            fatherName,
            motherName,
            parentsContact,
            password:newPass
        })

        res.status(201).json({
            studentDetails:{
                enrollNo:student.enrollNo,
                rollNo:student.rollNo,
                fName:student.fName,
                year:student.year,
                section:student.section
            }
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try again");
    }   
};

const showAll = async(req,res)=>{
    try {
        const students = await Students.find();
        if(students){
            const filteredStudents = students.map(student => ({
                enrollNo: student.enrollNo,
                rollNo: student.rollNo,
                fName: student.fName,
                lName: student.lName,
                year: student.year,
                section: student.section,
                dob: student.dob,
                email: student.email,
                courses: student.courses,
                fatherName: student.fatherName,
                motherName: student.motherName,
                parentsContact: student.parentsContact
              }));

            return res.status(200).send(filteredStudents);
        }

        res.status(400).send("Students not found!");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");
    }
}

module.exports = {addStudent,showAll};
const Students = require("../../models/student");

const showAll = async (req, res) => {
    try {

        const students = await Students.find({}, "-password").sort({ enrollNo: 1 });

        if (!students || students.length === 0) {
            return res.status(404).send("Students not found!");
        }
        return res.status(200).send(students);

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}


const showStudents = async (req, res) => {
    try {

        const { year, section, enrollNo, rollNo } = req.query;

        const queryObject = {};

        if (year) {
            queryObject.year = year;
        }

        if (section) {
            queryObject.section = section;
        }

        if (enrollNo) {
            queryObject.enrollNo = enrollNo;
        }

        if (rollNo) {
            queryObject.rollNo = rollNo;
        }
        // let limits=10;

        // if(limit)
        //     limits = limit;
        
        // let skips = 0;

        // if(skip)
        //     skips = skip;

        // if(gender)
        // {
        //     queryObject.gender = gender;
        // }
        

        let response = await Students.find(queryObject, "-password").sort({ enrollNo: 1 });
        
        // let newResponse = [];

        // response.forEach((student) =>{
        //     const[day,month,year] = student.dob.split("/");
        //     if(year == dobyear){
        //         newResponse.push(student);
        //     }
        // })
        
        if (!response) {
            return res.status(404).send("Students Not Found");
        }

        res.status(200).send({
            studentsDetails: response
        })

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}

const showStudent = async (req, res) => {
    try {

        const { enrollNo } = req.params;

        const student = await Students.findOne({ enrollNo }, "-password");

        if (!student) {
            return res.status(404).send("Student Not Found!");
        }

        return res.status(200).send({
            studentDetails: student
        });

    } catch (error) {

        console.log(error.message);
        return res.status(500).send("Error occured. Please try Again");

    }
}

const getStudents = async (req, res) => {
    try {

        const { year, section, courseId } = req.params;

        const qurey = {
            year: parseInt(year),
            section,
            courses: { $in: parseInt(courseId) }
        };

        const students = await Students.find({ year: parseInt(year), section, courses: { $in: parseInt(courseId) } }, "-password").sort({ rollNo: 1 });

        if (!students || students.length === 0) {
            return res.status(404).send("Students not found!");
        }
        console.log(students.length);
        return res.status(200).json(students);


    } catch (error) {

        console.log(error);
        return res.status(500).send("Error occured. Please try Again");

    }
}

module.exports = { showAll, showStudents, showStudent, getStudents };
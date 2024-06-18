const Course = require("../../models/course");

const addCourse = async (req,res)=>{
    //this function is for adding a new course
    try {
        const {courseId , courseName} = req.body;
        const courseExist = await Course.exists({courseId:courseId});
        if(courseExist){
            return res.status(409).send("Course already existing");
        }
        const course = await Course.create({
            courseId,
            courseName
        });
        res.status(201).send(course);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured please try again");
    }
};

const removeCourse = async(req,res)=>{
    // remove course from the database
    try {
        const {courseId} = req.body;
        const course = await Course.findOne({courseId:courseId});
        if(course){
            await Course.deleteOne({courseId:courseId});
            res.status(200).send("Course deleted successfully");
        }else{
            return res.status(400).send("Course does not exit. Please try again");
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occured please try again");
    }
};

const updateCourse = async(req,res)=>{
    //update the course name
    try{
        const {courseId,courseName} = req.body;
        const course = await Course.findOne({courseId:courseId});
        if(course){
            await Course.findOneAndUpdate({courseId:courseId},{courseName:courseName});
            res.status(200).send("Course name changed successfully");   
        }else{
            return res.status(400).send("Course does not exist/ Please try again");
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).send("Error occured. Please try again");
    }
}

const showCourses = async (req,res)=>{
    try {
        const courses = await Course.find();
        if(courses){
            res.status(200).send(courses);
        }else{
            return res.status(400).send("Courses not found!");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occured Please try again");
    }
}

module.exports = {addCourse,removeCourse,updateCourse,showCourses};

const connectDb = require("./src/database/connect");

const insertDataToDatabase = async(uri,data,model)=>{
    try {
        await connectDb(uri);
        await model.deleteMany();
        await model.insertMany(data);   
        console.log("Successfully Inserted the data to the database");
    } catch (error) {
        console.log(error);
    }
}

module.exports = insertDataToDatabase;
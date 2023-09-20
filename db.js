const mongoose = require("mongoose");
const url = "mongodb+srv://andrewpai:appDevelopment@cluster0.k2zyxeo.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(url, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    });
    console.log("App has successfully connected to the database");
}
module.exports = connectDB;

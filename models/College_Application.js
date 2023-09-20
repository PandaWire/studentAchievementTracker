const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollegeApplicationSchema = new Schema({
    college_id: String,
    name: String,
    application_type: String,
    year_applied: Number,
    application_result: String,
    major_applied: String,
    user_id: String

})

module.exports = mongoose.model('College_Application', CollegeApplicationSchema);
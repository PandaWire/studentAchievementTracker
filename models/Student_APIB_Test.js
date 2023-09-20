const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student_APIB_testSchema = new Schema({
    name: String,
    date: String,
    score: Number,
    user_id: String,
    testId: String
})

module.exports = mongoose.model('Student_APIB_test', Student_APIB_testSchema);
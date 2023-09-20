const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SATSchema = new Schema({
    date: String,
    math: Number,
    english: Number,
    total_score: Number,
    user_id: String,
    testId: String

})

module.exports = mongoose.model('SAT', SATSchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ACTSchema = new Schema({
    date: String,
    math: Number,
    science: Number,
    reading: Number,
    english: Number,
    writing: Number,
    stem: Number,
    composite: Number,
    user_id: String,
    testId: String
})

module.exports = mongoose.model('ACT', ACTSchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    name: String,
    description: String,
    relevant_fields: Array,
    testType: String
})

module.exports = mongoose.model('Test', TestSchema);
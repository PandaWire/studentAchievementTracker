const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExtracurricularSchema = new Schema({
    name: String,
    description: String,
    relevant_fields: Array,
    likes: Number
})

module.exports = mongoose.model('Extracurricular', ExtracurricularSchema);
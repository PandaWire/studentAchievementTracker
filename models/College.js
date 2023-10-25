const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    name: String,
    description: String,
    image_url: String

})

module.exports = mongoose.model('College', CollegeSchema);
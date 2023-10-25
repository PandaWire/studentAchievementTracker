const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AwardSchema = new Schema({
    name: String,
    organization: String,
    level: String,
    description: String,
    year: Number,
    image_url: String,
    user_id: String

})

module.exports = mongoose.model('Award', AwardSchema);
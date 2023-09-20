const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number,
    school: String,
    grad_year: Number,
    isGrad: Boolean,
    email: String,
    phone_number: String,
    state: String,
    city: String,
    activities: Array,
    major: String,
    interested_fields: String,
    colleges: Array

})

module.exports = mongoose.model('User', UserSchema);
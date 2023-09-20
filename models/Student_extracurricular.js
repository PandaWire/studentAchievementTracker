const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student_extracurricularSchema = new Schema({
    name: String,
    description: String,
    time_done: String,
    relevant_fields: Array, //["History", "CS", "Math", "Engineering"]
    leadership_role: String,
    user_id: String,
    extracurricular_id: String

})

module.exports = mongoose.model('Student_Extracurricular', Student_extracurricularSchema);
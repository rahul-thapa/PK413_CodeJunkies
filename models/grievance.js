var mongoose = require('mongoose');
const grievanceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Grievance', grievanceSchema);
var mongoose = require('mongoose');
const plantationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    quantity: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('PlantationReport', plantationSchema);
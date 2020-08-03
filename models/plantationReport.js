var mongoose = require("mongoose");
const plantationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cropName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  district: {
    type: String,
    required: true,
    maxlength: 100,
  },
  area: {
    type: Number,
    required: true,
  },
  filedTime: { type: Date, default: Date.now },
});
module.exports = mongoose.model("PlantationReport", plantationSchema);

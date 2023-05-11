const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Region = new Schema({
  name: { type: String, required: true },
  generation: { type: Number, required: true },
});

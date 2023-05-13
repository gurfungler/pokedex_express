const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegionSchema = new Schema({
  name: { type: String, required: true },
  generation: { type: Number, required: true },
});

// Virtual for the region's URL
RegionSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/pokedex/region/${this._id}`;
});

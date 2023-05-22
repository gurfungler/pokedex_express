const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  name: { type: String, required: true },
  Weakness: { type: [Schema.Types.ObjectId], ref: "Type" },
  Strength: { type: [Schema.Types.ObjectId], ref: "Type" },
});

// Virtual for the type's URL
TypeSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/pokedex/type/${this._id}`;
});

// Export model
module.exports = mongoose.model("Type", TypeSchema);

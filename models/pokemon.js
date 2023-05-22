const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  name: { type: String, required: true },
  //type: { type: Schema.Types.ObjectId, ref: "Type", required: true },
  //region: { type: [Schema.Types.ObjectId], ref: "Region" },
  number: { type: Number, required: true },
  description: { type: String, required: true },
});

// Virtual for pokemon's URL
PokemonSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/pokedex/pokemon/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pokemon", PokemonSchema);

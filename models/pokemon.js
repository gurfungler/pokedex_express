const mongoose = require("mongoose");

const Schema = mongoose.Schema;

PokemonSchema = new Schema({
  name: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: "Type", required: true },
  stats: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref: "Region" },
  gender: [{ type: String, required: true }],
  evolution: { type: Schema.Types.ObjectId, ref: "Pokemon" },
  number: { type: Number, required: true },
});

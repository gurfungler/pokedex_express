const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Type = new Schema({
  name: { type: String, required: true },
  Weakness: { type: [Schema.Types.ObjectId], ref: "Type" },
  Strength: { type: [Schema.Types.ObjectId], ref: "Type" },
});

const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    title: {
      type: String,
      minlength: 1,
      maxlength: 150,
      required: true
    },
    release: {
      type: Number,
      min: 1895,
      required: true
    },
    format: {
      type: String,
      enum: ["VHS", "DVD", "Blu-Ray"]
    },
    stars: {
      type: [String]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Film", schema);

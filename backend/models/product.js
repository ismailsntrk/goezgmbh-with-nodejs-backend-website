const mongoose = require("mongoose");

//user Schema

const productSchema = new mongoose.Schema(
  {
    nameTR: {
      type: String,
      required: true,
    },
    nameDE: {
      type: String,
      required: true,
    },
    nameFR: {
      type: String,
      required: true,
    },
    nameSP: {
      type: String,
      required: true,
    },
    nameNL: {
      type: String,
      required: true,
    },

    imageStr: {
      type: String,
      required: true,
    },
    gen : {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

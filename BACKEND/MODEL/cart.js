
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productid: {
      type: Number,
      required: true
    },

    productquantity: {
      type: Number,
      default: 1,
      required: true
    },

    productprice: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
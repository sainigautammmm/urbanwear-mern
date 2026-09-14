
const Cart = require("../MODEL/cart");

const addtocart = async (req, res) => {

  try {

    const {
      productid,
      productquantity,
      productprice
    } = req.body;

    let cartitem = await Cart.findOne({
      productid
    });

    console.log(cartitem);

    if (cartitem) {

      cartitem.productquantity += productquantity;

      await cartitem.save();

      res.status(200).json({
        success: true,
        message: "product quantity updated in cart",
        cartitem
      });

    } else {

      cartitem = new Cart({
        productid,
        productquantity,
        productprice
      });

      await cartitem.save();

      res.status(200).json({
        success: true,
        message: "product added to cart",
        cartitem
      });
    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// REMOVE FROM CART
const removefromcart = async (req, res) => {

  try {

    const { productid } = req.params;

    const deletedItem = await Cart.findOneAndDelete({
      productid: Number(productid)
    });

    if (!deletedItem) {

      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });

    }

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      productid: Number(productid)
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  addtocart,
  removefromcart
};
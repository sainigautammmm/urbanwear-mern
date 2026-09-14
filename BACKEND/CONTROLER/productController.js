const productmodel = require("../MODEL/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await productmodel.find(); // Fetch all products from the database
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllProducts };

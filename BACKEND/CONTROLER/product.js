const productmodel = require("../MODEL/product");

const productfetch = async (req, res) => {
  try {
    const {
      productname,
      productid,
      productprice,
      producttitle,
      productthumbnail,
      productcategory,
      productrating,
      productquantity,
    } = req.body;

    const savedproduct = await productmodel.create({
      productname,
      productid,
      productprice,
      producttitle,
      productthumbnail,
      productcategory,
      productrating,
      productquantity
    });

    res.status(201).json({
      success: true,
      message: "new  products cretaed sucessfully",
      Data: savedproduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  productfetch,
};

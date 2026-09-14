const express = require("express");
const router = express.Router();
const Product = require("../MODEL/product");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please tell me what outfit you are looking for."
      });
    }

    const text = message.toLowerCase();

    // Budget detect
    const budgetMatch = text.match(/(?:₹|rs\.?|rupees?)\s?(\d+)/i);
    const budget = budgetMatch ? Number(budgetMatch[1]) : null;

    // Category detect
    let category = null;

    if (text.includes("jeans")) {
      category = "Jeans";
    } else if (
      text.includes("shorts") ||
      text.includes("short") ||
      text.includes("nikar")
    ) {
      category = "Shorts";
    } else if (
      text.includes("shirt") &&
      !text.includes("t-shirt")
    ) {
      category = "Shirts";
    } else if (
      text.includes("t-shirt") ||
      text.includes("tshirt")
    ) {
      category = "T-Shirts";
    } else if (
      text.includes("jacket")
    ) {
      category = "Jackets";
    } else if (
      text.includes("hoodie")
    ) {
      category = "Hoodies";
    } else if (
      text.includes("pants") ||
      text.includes("trouser")
    ) {
      category = "Pants";
    }

    // Occasion detect
    let occasion = "casual";

    if (
      text.includes("party") ||
      text.includes("function")
    ) {
      occasion = "party";
    } else if (
      text.includes("office") ||
      text.includes("formal")
    ) {
      occasion = "office";
    } else if (
      text.includes("college")
    ) {
      occasion = "college";
    } else if (
      text.includes("date")
    ) {
      occasion = "date";
    }

    // Get products from MongoDB
    let products = await Product.find();

    // Budget filter
    if (budget) {
      products = products.filter(
        (product) =>
          Number(product.productprice) <= budget
      );
    }

    // Category filter
    if (category) {
      products = products.filter(
        (product) =>
          product.productcategory?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // If no exact category result, show affordable products
    if (products.length === 0) {
      products = await Product.find();

      if (budget) {
        products = products.filter(
          (product) =>
            Number(product.productprice) <= budget
        );
      }
    }

    // Sort by rating
    products.sort(
      (a, b) =>
        Number(b.productrating) -
        Number(a.productrating)
    );

    const suggestions = products.slice(0, 3);

    if (suggestions.length === 0) {
      return res.json({
        reply:
          "Sorry, I couldn't find products matching your budget. Try increasing your budget a little."
      });
    }

    let reply = `✨ Here's a ${occasion} outfit suggestion for you:\n\n`;

    suggestions.forEach((product, index) => {
      reply += `${index + 1}. ${product.productname} - ₹${product.productprice}\n`;
    });

    if (budget) {
      reply += `\n💰 Budget: ₹${budget}`;
    }

    reply +=
      "\n\nYou can choose the style you like and check the product on UrbanWear.";

    res.json({
      reply,
      products: suggestions
    });

  } catch (error) {
    console.error("AI Stylist error:", error);

    res.status(500).json({
      reply: "Something went wrong. Please try again."
    });
  }
});

module.exports = router;
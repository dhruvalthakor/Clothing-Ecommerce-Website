const express = require("express");

const auth = require("../middleware/auth");
const cartmodel = require("../model/cartmodel");
const productmodel = require("../model/productmodel");
const cartRouter = express.Router();

// Get all carts for a user
cartRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.body.userid;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const carts = await cartmodel.find({ userid: userId });
    res.status(200).json({ carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch carts", error: error.message });
  }
});

// Add a new cart
cartRouter.post("/addcart/:id", auth, async (req, res) => { 
  try {
    const cartId = req.params.id;
    const product = await productmodel.findById(cartId); // Use findById to fetch a single product

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userid = req.body.userid;

    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const newcart = await cartmodel.create({ userid, product });
    res.status(201).json({ message: "Cart added successfully", newcart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add cart", error: error.message });
  }
});

// Delete a cart by ID
cartRouter.delete("/deletecart/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required" });
    }

    await cartmodel.findByIdAndDelete(cartId);

    const userId = req.body.userid;
    const carts = await cartmodel.find({ userid: userId });

    res.status(200).json({ message: "Cart deleted successfully", carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete cart", error: error.message });
  }
});

// Commented-out code left for clarity
module.exports = cartRouter;

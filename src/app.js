const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//// Endpoint - /api/v1/products/:id
const api2 = async (req, res) => {
  try {
    [...products].forEach((item) => {
      if (parseInt(req.params.id) === item.id) {
        res.status(200).json({
          status: "success",
          message: "Product fetched successfully",
          data: { product: { ...item } },
        });
        return;
      }
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found", error });
  }
};
app.get("/products/:id", api2);

module.exports = app;

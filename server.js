const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

//Database Connection

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://blogApp:HXNQlkMwLRC5UOsW@cluster0.sdch9vy.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected successfully");
    app.listen(8080, () => {
      console.log("Server is running on port 8080...");
    });
  })
  .catch((err) => {
    console.log("There was an error");
  });
//HXNQlkMwLRC5UOsW(password)


app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.send("This is the home page.");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

app.get("/product", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res.status(404).json({ message: `We cannot find product with id ${id}` });
      }
    const newProduct = await Product.findById(id)
    res.status(200).json(newProduct);
      
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete('/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
        res.status(404).json({ message: "There is no product with such ID" });
    }
    res.status(200).json(product)
    } catch (err) {
        res.status(404).json({message: err.message})
    }
})



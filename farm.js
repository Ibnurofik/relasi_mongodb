const mongoose = require("mongoose");

//connected to mongodb
mongoose
  .connect("mongodb://127.0.0.1/relation_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["spring", "summer", "fall", "winter"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);
// Product.insertMany([
//   {
//     name: "Melon",
//     price: 9,
//     season: "summer",
//   },
//   {
//     name: "Watermelon",
//     price: 11,
//     season: "summer",
//   },
//   {
//     name: "Kiwi",
//     price: 12,
//     season: "summer",
//   },
// ]);

// const makeFarm = async () => {
//   const farm = new Farm({
//     name: "Farm",
//     city: "Anytown",
//   });
//   const melon = await Product.findOne({ name: "Melon" });
//   farm.products.push(melon);
//   await farm.save();
//   console.log(farm);
// };

// makeFarm();

// const addProduct = async (id) => {
//   const farm = await Farm.findById(id);
//   const Watermelon = await Product.findOne({ name: "Watermelom" });
//   farm.products.push(Watermelon);
//   await farm.save();
//   console.log(farm);
// };

// addProduct("6714b8e79b48a7333ba1df09");

Farm.findOne({ name: "Farm" })
  .populate("products", "name")
  .then((farm) => {
    console.log(farm);
    for (const product of farm.products) {
      console.log(product.name);
    }
  });

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

const userSchema = new mongoose.Schema({
  name: String,
  addresses: [
    {
      _id: false,
      street: String,
      city: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// const makeUser = async () => {
//   const user = new User({
//     name: "John Doe",
//   });
//   user.addresses.push({
//     street: "123 Main st",
//     city: "Anytom",
//     country: "USA",
//   });
//   const res = await user.save();
//   console.log(res);
// };

// makeUser();

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "123 Main St",
    city: "Anytom",
    country: "INA",
  });
  const res = await user.save();
  console.log(res);
};

addAddress("6714b017a38502e36c37848c");

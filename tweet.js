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
  text: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweet = async () => {
  const user = new User({
    userName: "John Doe",
    age: 30,
  });
  const tweet = new Tweet({
    text: "Hello World War 2",
    likes: 0,
  });
  tweet.user = user;
  tweet.save();
};

// makeTweet();

const showTweets = async () => {
  const tweets = await Tweet.findById("6714d0413070775b6f3712d4").populate(
    "user"
  );
  console.log(tweets);
};

showTweets();

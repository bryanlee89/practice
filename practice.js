const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  username: String,
  email: String,
  posts: [{ type: Schema.types.ObjectID, ref: "Post" }],
  date: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  _creator: { type: Number, ref: "User" },
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

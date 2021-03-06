const User = require("./User");
const Post = require("./Post");
const router = require("../routes/api/user-routes");

// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

module.exports = { User, Post };

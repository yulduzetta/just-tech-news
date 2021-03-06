const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// createt our Post model
class Post extends Model {}

// Define the columns in the Post, configure the naming conventions,
// and pass the current connection instance to initialize the Post model.

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  //   configure the metadata,
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    // in Sequelize, columns are camelcase by default.
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "post",
  }
);

module.exports = Post;

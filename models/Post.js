const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// createt our Post model
class Post extends Model {
  // Here, we're using JavaScript's built-in 'static' keyword to indicate
  // that the upvote method is one that's based on the Post model and
  // not an instance method like we used earlier with the User model.
  // This exemplifies Sequelize's heavy usage of object-oriented principles and concepts.

  // The method below is considered a model method vs instance method
  // https://sequelize.org/v5/manual/models-definition.html#expansion-of-models

  // We've set it up so that we can now execute Post.upvote()
  // as if it were one of Sequelize's other built-in methods
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          "id",
          "post_url",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
  }
}

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

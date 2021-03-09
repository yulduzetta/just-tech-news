// This file contains all of the user-facing routes, such as the homepage and login page.

const sequelize = require("sequelize");
const { User, Post, Comment } = require("../models");

const router = require("express").Router();

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // You didn't need to serialize data before when you built API routes,
      // because the res.json() method automatically does that for you.
      // This will loop over and map each Sequelize object into a serialized version of itself, 
      // saving the results in a new posts array. 
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // you can NOT use res.sendFile() here b/c sendFile() would only be used with static HTML files.
      res.render("homepage", {posts});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

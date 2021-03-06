const router = require("express").Router();
const { reset } = require("nodemon");
const { Comment } = require("../../models");
const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
    order: [["created_at", "DESC"]],
  }).then((dbCommentData) => {
    res.json(dbCommentData).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

router.post("/", (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(400).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

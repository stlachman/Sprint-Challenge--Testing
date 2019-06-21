const router = require("express").Router();

const Games = require("./games-model");

router.post("/", validateGame, (req, res) => {
  Games.insert(req.body)
    .then(game => {
      res.status(201).json(game);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating game" });
    });
});

router.get("/", (req, res) => {
  Games.find()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving games" });
    });
});

function validateGame(req, res, next) {
  if (req.body && req.body.title && req.body.genre) {
    next();
  } else {
    res
      .status(422)
      .json({ message: "Title and genre are needed to create a game" });
  }
}

module.exports = router;

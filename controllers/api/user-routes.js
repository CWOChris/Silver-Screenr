const router = require("express").Router();
const { Movie, User } = require("../../models");

const express = require("express");
const { authCheck } = require("../../utils/auth");

router.get(
  "/user/:id",
  // authCheck, //turned off for testing
  async (req, res) => {
    try {
      const userMovies = await Movie.findAll({
        where: {
          user_id: req.params.id,
        },
      });

      const allUserMovies = userMovies.map((movie) =>
        movie.get({ plain: true })
      );

      console.log(allUserMovies);
      res.status(200).json(allUserMovies);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

//TODO: UPDATE user pref (public/private, update all movies) - auth required

module.exports = router;

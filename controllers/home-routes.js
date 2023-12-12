const router = require("express").Router();
const { Movie, User } = require("../models");

const express = require("express");
const { authCheck } = require("../utils/auth");

// TODO: route for homepage with all blog posts. NO LOGIN NEEDED.
router.get("/", async (req, res) => {
  try {
    const publicMovies = await Movie.findAll({
      where: {
        is_public: true,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    console.log(publicMovies);

    const allPublicMovies = publicMovies.map((movie) =>
      movie.get({ plain: true })
    );

    // res.render("homepage", {
    //   allPublicMovies,
    //   loggedIn: req.session.loggedIn,
    // });
    console.log(allPublicMovies);
    res.status(200).json(allPublicMovies);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

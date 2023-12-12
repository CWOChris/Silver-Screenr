const router = require("express").Router();
const { Movie, User } = require("../models");

const express = require("express");
const { authCheck } = require("../utils/auth");

// TODO: route for homepage with all public movies. NO LOGIN NEEDED.
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

    //render in handlebars
    // res.render("homepage", {
    //   allPublicMovies,
    //   loggedIn: req.session.loggedIn,
    // });

    //comment this out if rendering in handlebars
    console.log(allPublicMovies);
    res.status(200).json(allPublicMovies);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to get all movies from a single user. authCheck should be used,
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

      //render in handlebars
      // res.render("userpage", {
      //   allUserMovies,
      //   loggedIn: req.session.loggedIn,
      // });

      //comment this out if rendering in handlebars
      console.log(allUserMovies);
      res.status(200).json(allUserMovies);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

//TODO: Login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});


//TODO: Sign Up  Page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

//TODO: User Preferences  - auth required






//TODO: routes for sorted movie data? added on date, watched/reviewed date

module.exports = router;

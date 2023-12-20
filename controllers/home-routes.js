const router = require("express").Router();
const { Movie, User } = require("../models");

const express = require("express");
const { authCheck } = require("../utils/auth");

const axios = require("axios");
const apiKey = process.env.API_KEY;

//route to homepage
router.get("/", async (req, res) => {
  // render in handlebars;



  res.render("homepage", {
    user: req.session.userData,
    loggedIn: req.session.loggedIn,
  });
});

// public page with all public movies
router.get("/public", async (req, res) => {
  try {
    const response = await axios.get("${tmdbBaseUrl}/movie/popular", {
      params: {
        api_key: apiKey,
      },
    });

    const tmdbMovies = response.data.results;
    res.render("homepage", {
      tmdbMovies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/public", async (req, res) => {
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

      // render in handlebars;
      res.render("homepage", {
        allUserMovies,
        loggedIn: req.session.loggedIn,
      });

      //comment this out if rendering in handlebars
      // console.log(allUserMovies);
      // res.status(200).json(allUserMovies);
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
    res.redirect("signup"); // Added "signup" - Chris R
    return;
  }

  res.render("signup");
});

// router.use((req, res) => {
//   res.render("errorpage", {
//     loggedIn: req.session.loggedIn,
//   });
// });

//TODO: User Preferences  - auth required

//TODO: routes for sorted movie data? added on date, watched/reviewed date

module.exports = router;

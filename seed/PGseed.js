//this will seed the postgres data - make sure you have a POSTGRES_DB variable in your .env file. 

const Sequelize = require("sequelize");
require("dotenv").config();
sequelize = new Sequelize(process.env.POSTGRES_DB);

const { User, Movie } = require("../models");

const userData = require("./userData.json");
const movieData = require("./movieData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Movie.bulkCreate(movieData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

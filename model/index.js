const User = require("./User");
const Movie = require("./Movie");

// TODO: USER has many Movie

User.hasmany(Movie, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// // TODO: Movie has one User
Movie.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Movie };

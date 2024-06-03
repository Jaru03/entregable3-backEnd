const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieGenre,
  setMovieActor,
  setMovieDirector,
} = require("../controllers/movie.controllers");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/movies").get(getAll).post(create);

movieRouter.route("/movies/:id/genres").post(setMovieGenre);

movieRouter.route("/movies/:id/actors").post(setMovieActor);

movieRouter.route("/movies/:id/directors").post(setMovieDirector);

movieRouter.route("/movies/:id").get(getOne).delete(remove).put(update);

module.exports = movieRouter;

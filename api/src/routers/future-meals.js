import express from "express";
import knex from "../database_client.js";

// This router can be deleted once you add your own router
const futureMealsRouter = express.Router();

futureMealsRouter.get("/", async (req, res) => {
  const now = new Date();
  const futureMeals = await knex("meal").where("when", ">", now);
  res.json(futureMeals);
});

export default futureMealsRouter;

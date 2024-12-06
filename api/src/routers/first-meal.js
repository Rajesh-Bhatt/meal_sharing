import express from "express";
import knex from "../database_client.js";

const firstMealRouter = express.Router();

firstMealRouter.get("/", async (req, res) => {
  const firstMeal = await knex("meal").orderBy("id", "asc").first(1);
  res.json(firstMeal);
});
console.log(firstMeal);
export default firstMealRouter;

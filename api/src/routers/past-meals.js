import express from "express";
import knex from "../database_client.js";

const pastMealsRouter = express.Router();

pastMealsRouter.get("/", async (req, res) => {
  const now = new Date();
  const pastMeals = await knex("meal").select("*").where("when", "<", now);
  res.json(pastMeals);
});

export default pastMealsRouter;

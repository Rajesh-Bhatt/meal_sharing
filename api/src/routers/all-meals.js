import express from "express";
import knex from "../database_client.js";

const allMealsRouter = express.Router();

allMealsRouter.get("/", async (req, res) => {
  const { title, sortKey = "id", sortDir = "asc" } = req.query;

  let query = knex("meal")
    .select(
      "meal.*",
      knex.raw(
        "meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0) AS available_spots"
      )
    )
    .leftJoin("reservation", "meal.id", "reservation.meal_id")
    .groupBy("meal.id");

  // Filter by title if provided
  if (title) {
    query = query.where("meal.title", "like", `%${title}%`);
  }

  // Sort by specified key and direction
  if (sortKey && sortDir) {
    query = query.orderBy(sortKey, sortDir);
  }

  try {
    const allMeals = await query;
    res.json(allMeals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

export default allMealsRouter;

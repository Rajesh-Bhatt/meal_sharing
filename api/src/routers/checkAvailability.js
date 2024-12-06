// src/routers/checkAvailability.js

import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.get("/checkAvailability/:id", async (req, res, next) => {
  try {
    const mealId = req.params.id;
    const meal = await knex("meal").where("id", mealId).first();
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    const totalReservations = await knex("reservation")
      .where("meal_id", mealId)
      .sum("number_of_guests as total");
    const availableReservations =
      meal.max_reservations - totalReservations[0].total;
    res.json({ availableReservations });
  } catch (error) {
    next(error);
  }
});
export default router;

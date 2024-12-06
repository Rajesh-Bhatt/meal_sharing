import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res, next) => {
  try {
    const query = knex("meal");
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;

    if (maxPrice !== undefined) {
      query.where("price", "<", maxPrice);
    }
    if (availableReservations !== undefined) {
      if (availableReservations === "true") {
        //might be returned as a string, hence checking explicitly
        query
          .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
          .select("meal.id", "meal.max_reservations", "meal.title")
          .sum("reservation.number_of_guests as sum_of_guests")
          .groupBy("meal.id", "meal.max_reservations", "meal.title")
          .having("sum_of_guests", "<", knex.ref("meal.max_reservations"));
      } else {
        query
          .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
          .select("meal.id", "meal.max_reservations", "meal.title")
          .sum("reservation.number_of_guests as sum_of_guests")
          .groupBy("meal.id", "meal.max_reservations", "meal.title")
          .having("sum_of_guests", ">=", knex.ref("meal.max_reservations"));
      }
    }
    if (title !== undefined) {
      query.where("title", "like", `%${title}%`); //performing a partial match here
    }
    if (dateAfter !== undefined) {
      query.where("when", ">", dateAfter);
    }
    if (dateBefore !== undefined) {
      query.where("when", "<", dateBefore);
    }
    if (limit !== undefined) {
      query.limit(limit); //Returns the given number of meals
    }

    //Returns all meals sorted by the given key
    if (sortKey !== undefined) {
      if (sortKey == "price") {
        query.orderBy("price", sortDir !== undefined ? sortDir : "asc");
      }
      if (sortKey == "max_reservations") {
        query.orderBy(
          "max_reservations",
          sortDir !== undefined ? sortDir : "asc"
        );
      }
    }
    const meals = await query;
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

//Adds a new meal to the database
mealsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await knex("meal").insert(data);
    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

//Returns the meal by id
mealsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = await knex("meal").select("*").where("id", id);
    if (meal.length === 0) {
      res.status(404).json({ message: "Meal not found" });
    } else {
      res.json(meal);
    }
  } catch (error) {
    next(error);
  }
});

//Updates the meal by id

mealsRouter.put("/:id", async (req, res) => {
  try {
    const updated = await knex("meal")
      .where({ id: req.params.id })
      .update(req.body);
    if (updated) {
      const updatedMeal = await knex("meal")
        .where({ id: req.params.id })
        .first();
      res.json(updatedMeal);
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update meal" });
  }
});

//Deletes the meal by id
mealsRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("meal").where({ id: req.params.id }).del();
    if (deleted) {
      res.json({ message: "Meal deleted" });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete meal" });
  }
});

//Returns all reviews for a specific meal.
// GET /api/meals/:meal_id/reviews
mealsRouter.get("/:meal_id/reviews", async (req, res, next) => {
  try {
    const id = req.params.meal_id;
    const reviewsForMeal = await knex("review").where("meal_id", id);
    if (reviewsForMeal.length == 0) {
      res.json({ message: "Meal not found" });
    } else {
      res.json(reviewsForMeal);
    }
  } catch (error) {
    next(error);
  }
});

export default mealsRouter;

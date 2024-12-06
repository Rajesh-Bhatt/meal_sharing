import express from "express";
import knex from "../database_client.js";

const reviewRouter = express.Router();

//Returns all reviews.
reviewRouter.get("/", async (req, res, next) => {
  try {
    const allReviews = await knex("review");

    if (allReviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.json(allReviews);
  } catch (error) {
    next(error);
  }
});

// Adds a new review to the database.
reviewRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    await knex("review").insert(data);
    res.status(201).json({ message: "Created Successfully" });
  } catch (error) {
    next(error);
  }
});

// Returns a review by id.
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await knex("review").where("id", id).first();
    if (!result) {
      return res.status(404).json({ message: "Review not found" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

// Updates the review by id.
reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedReview = req.body;

    // Check if updatedReview is empty
    if (!updatedReview || Object.keys(updatedReview).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }
    // Perform the update
    const result = await knex("review").where("id", id).update(updatedReview);

    if (result) {
      res.status(200).json({ message: "Review updated successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Deletes the review by id.
reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedReview = await knex("review").where({ id }).del();
    if (deletedReview) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;

import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

// Returns all reservations
reservationsRouter.get("/", async (req, res) => {
  const reservations = await knex("reservation").orderBy("id");
  res.json(reservations);
});

//Adds a new reservation to the database
reservationsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    const data = req.body;
    await knex("reservation").insert(data);
    res.status(201).json({ meaasge: "Created successfully" });
  } catch (error) {
    next(error);
  }
});

//Returns a reservation by id
reservationsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const reservation = await knex("reservation").select("*").where("id", id);
    if (reservation.length === 0) {
      res.status(404).json({ message: "No reservation found" });
    } else {
      res.status(200).json(reservation);
    }
  } catch (error) {
    next(error);
  }
});

//Updates the reservation by id

reservationsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Request body:", req.body);

    const updatedReservation = req.body;
    const result = await knex("reservation")
      .where("id", id)
      .update(updatedReservation);

    if (result) {
      res.status(200).json({ message: "Reservation updated successfully" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    next(error);
  }
});

//Deletes the reservation by id
reservationsRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await knex("reservation").where({ id: id }).del();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete reservation" });
  }
});

export default reservationsRouter;

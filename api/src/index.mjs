import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import futureMealsRouter from "./routers/future-meals.js";
import pastMealsRouter from "./routers/past-meals.js";
import allMealsRouter from "./routers/all-meals.js";
import firstMealRouter from "./routers/past-meals.js";
import lastMealRouter from "./routers/last-meal.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewRouter from "./routers/review.js";
import checkAvailabilityRouter from "./routers/checkAvailability.js";

const app = express();

//const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  res.send(`<h1>Welcome to meal sharing API</h1>
    <p>This API provides routes to view meal information</p>
    <ul>
    <li><strong>/api/future-meals:</strong> Meals scheduled for the future.</li>
   <li><strong>/api/past-meals:</strong> Meals that have already occurred.</li>
  <li><strong>/api/all-meals: </strong> Get All meals that are sorted by ID.</li>
  <li><strong>/api/first-meal:</strong> Get the meal with the smallest ID.</li>
  <li><strong>/api/last-meal:</strong> Get the meal with the largest ID.</li>
   <li><strong>/api/meals:</strong> Get information about all meals.</li>
   <li><strong>/api/reservations:</strong> Get information about meal reservations.</li>
   <li><strong>/api/reviews:</strong> Get information about meal reviews.</li>
  </ul>
`);
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/future-meals", futureMealsRouter);
apiRouter.use("/past-meals", pastMealsRouter);
apiRouter.use("/all-meals", allMealsRouter);
apiRouter.use("/first-meal", firstMealRouter);
apiRouter.use("/last-meal", lastMealRouter);
apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationsRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("checkAvailability", checkAvailabilityRouter);

app.use("/api", apiRouter);
app.use("/api", checkAvailabilityRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

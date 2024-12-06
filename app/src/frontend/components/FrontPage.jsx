import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Meal from "./Meal"; 
import styles from "./FrontPage.module.css";

function HomePage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/all-meals");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data.slice(0, 3)); 
      } catch (error) {
        console.error("Failed to fetch meals:", error);
        setError("Failed to load meals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles["home-container"]}>
      <header className={styles["header"]}>
      </header>

      <main className={styles["main-content"]}>
        <h1 className={styles["title"]}>Welcome to Namaste Nepal Restaurant</h1>
        <p className={styles["subtitle"]}>
        Share a table, share a story—reserve your meal today!
        </p>

        <div className={styles["meals-preview"]}>
          <h2 className={styles["featured-meals-title"]}>Top Picks</h2>
          <div className={styles["meals-grid"]}>
            {meals.map((meal, index) => (
              <Meal key={index} meal={meal} showReviewButton={false}  variant="home" />
            ))}
          </div>
          <button
            className={styles["explore-btn"]}
            onClick={() => navigate("/all-meals")}
          >
            See All Meals
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
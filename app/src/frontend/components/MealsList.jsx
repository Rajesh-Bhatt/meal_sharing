import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import styles from "./MealsList.module.css";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    fetchMeals(); 
  }, [sortKey, sortDir]); 

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3001/api/all-meals?title=${searchQuery}&sortKey=${sortKey}&sortDir=${sortDir}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      setError("Failed to load meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading meals...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2 className={styles["meals"]}>Meals</h2>
      <section className={styles["section"]}>

      <div className={styles["controls"]}>
  <div className={styles["controls-left"]}>
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search for meals..."
    />
    <button onClick={fetchMeals}>Search</button>
  </div>

  <div className={styles["controls-right"]}>
    <select value={sortKey || "select"} onChange={(e) => setSortKey(e.target.value)}>
      <option value="price">Sort by Price</option>
      <option value="title">Sort by Title</option>
    </select>

    <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</div>
</section>
      <div className={styles["meal-container"]}>
        <div className={styles["meals-grid"]}>
          {meals.length > 0 ? (
            meals.map((meal, id) => (
              <Meal key={id} meal={meal} variant="all-meals" />
            ))
          ) : (
            <p>No meals available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MealsList;

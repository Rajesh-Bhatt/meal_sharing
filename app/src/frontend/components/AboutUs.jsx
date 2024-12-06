import React from "react";
import styles from "./AboutPage.module.css";

function AboutPage() {
  return (
    <div className={styles["about-container"]}>
      <header className={styles["header"]}>
        <h1 className={styles["title"]}>About Namaste Nepal</h1>
      </header>

      <main className={styles["content"]}>
        <section className={styles["section"]}>
          <h2>Our Mission</h2>
          <p>
          Meal Sharing brings people together from all corners of the world through the joy of homemade cooking. We believe that sharing a meal is more than just eating—it’s about building connections and creating lasting memories.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2>How It Works</h2>
          <p>
          Hosts prepare delicious homemade meals and welcome guests into their homes, offering more than just food—a chance to share stories, traditions, and culture. Guests can explore a variety of meals, make reservations, and experience the diverse flavors of the world while forming genuine connections around the host’s table.
          </p>
        </section>

        <section className={styles["section"]}>
          <h2>Our Story</h2>
          <p>
          Meal Sharing began as a simple idea among friends who shared a love for cooking and connecting with others. What started as intimate dinners quickly evolved into a worldwide community of food enthusiasts, cultural adventurers, and like-minded individuals coming together to share meals and create lasting memories.
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
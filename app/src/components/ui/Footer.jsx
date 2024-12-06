import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Meal Sharing. All rights reserved.</p>
      <ul className={styles.footerLinks}>
        <li><a href="/">Privacy Policy</a></li>
        <li><a href="/">Terms of Service</a></li>
        <li><a href="/">Contact Us</a></li>
      </ul>
    </footer>
    </div>
  );
}

export default Footer;
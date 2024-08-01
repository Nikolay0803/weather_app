import React from "react";
import styles from "../page.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Weather App</h1>
    </header>
  );
};

export default Header;

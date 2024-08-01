"use client";

import React from "react";
import styles from "../page.module.css";

type FavoritesProps = {
  favorites: string[];
};

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  return (
    <div className={styles.favorites}>
      <h2>Улюблене</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>{favorite}</li>
          ))}
        </ul>
      ) : (
        <p>Немає улюблених елементів.</p>
      )}
    </div>
  );
};

export default Favorites;

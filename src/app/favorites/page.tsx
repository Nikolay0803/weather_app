"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import WeatherCard from "../components/WeatherCard";
import { WeatherData } from "../types/types";
import styles from "../page.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<WeatherData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("favorites");

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <div className={styles.container}>
      <Header />
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className={styles.content}>
        <h2>Улюблене</h2>
        {favorites.length > 0 ? (
          <div className={styles.favorites}>
            {favorites.map((favorite, index) => (
              <WeatherCard key={index} weather={favorite} />
            ))}
          </div>
        ) : (
          <p>Немає улюблених елементів.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

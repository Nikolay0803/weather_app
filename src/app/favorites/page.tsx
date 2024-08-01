"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { WeatherData } from "../types/types";
import styles from "../page.module.css";
import FavoriteCard from "../components/FacoriteCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<WeatherData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("favorites");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

    const handleRemoveFavorite = (cityName: string) => {
      setFavorites(favorites.filter((fav) => fav.name !== cityName));
    };

  return (
    <div className={styles.container}>
      <Header />
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className={styles.content}>
        <h2>Улюблене</h2>
        {loading ? (
          <div className={styles.loader} />
        ) : favorites.length > 0 ? (
          <div className={styles.favorites}>
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.name}
                weather={favorite}
                onRemove={() => handleRemoveFavorite(favorite.name)}
              />
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

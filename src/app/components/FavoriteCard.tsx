"use client";

import React from "react";
import { WeatherData } from "../types/types";
import styles from "../page.module.css";

type FavoriteCardProps = {
  weather: WeatherData;
  onRemove: () => void;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ weather, onRemove }) => {
  return (
    <div className={styles.favoriteCard}>
      <div className={styles.weatherInfo}>
        <h3>
          {weather.name}, {weather.sys.country}
        </h3>
        <p>Температура: {weather.main.temp}°C</p>
        <p>Погода: {weather.weather[0].description}</p>
        <p>Вологість: {weather.main.humidity}%</p>
        <p>Тиск: {weather.main.pressure} hPa</p>
      </div>
      <button className={styles.removeButton} onClick={onRemove}>
        Видалити
      </button>
    </div>
  );
};

export default FavoriteCard;

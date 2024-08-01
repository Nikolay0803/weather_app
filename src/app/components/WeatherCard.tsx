"use client";

import React from "react";
import { WeatherData } from "../types/types";
import styles from "../page.module.css";

type WeatherCardProps = {
  weather: WeatherData;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  if (
    !weather ||
    !weather.main ||
    !weather.weather ||
    weather.weather.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.card}>
      <h3>{weather.name}</h3>
      <div className={styles.weatherList}>
        <p className={styles.weatherItem}>Температура: {weather.main.temp}°C</p>
        <p className={styles.weatherItem}>
          Погода: {weather.weather[0].description}
        </p>
        <p className={styles.weatherItem}>
          Вологість: {weather.main.humidity}%
        </p>
        <p className={styles.weatherItem}>Тиск: {weather.main.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherCard;

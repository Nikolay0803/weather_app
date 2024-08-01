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
      <p>Temperature: {weather.main.temp}°C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;

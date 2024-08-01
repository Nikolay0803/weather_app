"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import WeatherBlock from "./components/WeatherBlock";
import AutoCompleteInput from "./components/AutoComleteInput";
import { WeatherData } from "./types/types";

export default function Home() {
  const [cities, setCities] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [weatherBlocks, setWeatherBlocks] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<WeatherData[]>([]);

  useEffect(() => {
    const storedCities = localStorage.getItem("cities");
    if (storedCities) setCities(JSON.parse(storedCities));

    const storedWeatherBlocks = localStorage.getItem("weatherBlocks");
    if (storedWeatherBlocks) setWeatherBlocks(JSON.parse(storedWeatherBlocks));

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }, [cities]);

  useEffect(() => {
    if (weatherBlocks.length > 0) {
      localStorage.setItem("weatherBlocks", JSON.stringify(weatherBlocks));
    }
  }, [weatherBlocks]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addWeatherBlock = (city: string) => {
    if (weatherBlocks.length < 5 && !weatherBlocks.includes(city)) {
      setWeatherBlocks([...weatherBlocks, city]);
    }
  };

  const handleSelectCity = (city: string) => {
    if (!cities.includes(city)) {
      setCities([...cities, city]);
    }
    addWeatherBlock(city);
  };

  return (
    <div className={styles.container}>
      <Header />
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className={styles.content}>
        <AutoCompleteInput onSelect={handleSelectCity} />
        {weatherBlocks.map((city, index) => (
          <WeatherBlock
            key={index}
            id={index}
            city={city}
            removeBlock={() => {
              const newBlocks = weatherBlocks.filter((_, idx) => idx !== index);
              setWeatherBlocks(newBlocks);
            }}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
}

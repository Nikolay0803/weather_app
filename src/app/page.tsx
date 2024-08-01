"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import WeatherBlock from "./components/WeatherBlock";
import AutoCompleteInput from "./components/AutoComleteInput";
import { WeatherData } from "./types/types";

export default function Home() {
  const [cities, setCities] = useState<string[]>(() => {
    const storedCities = localStorage.getItem("cities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  const [currentTab, setCurrentTab] = useState<string>("home");

  const [weatherBlocks, setWeatherBlocks] = useState<string[]>(() => {
    const storedWeatherBlocks = localStorage.getItem("weatherBlocks");
    return storedWeatherBlocks ? JSON.parse(storedWeatherBlocks) : [];
  });

  const [favorites, setFavorites] = useState<WeatherData[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem("weatherBlocks", JSON.stringify(weatherBlocks));
  }, [weatherBlocks]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
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

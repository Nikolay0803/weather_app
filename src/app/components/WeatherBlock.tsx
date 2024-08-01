"use client";

import React, { useState, useEffect } from "react";
import { getWeatherByCity, getWeatherForecast } from "../api/api";
import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";
import Modal from "./Modal";
import { WeatherData, ForecastData } from "../types/types";
import styles from "../page.module.css";

type WeatherBlockProps = {
  id: number;
  city: string;
  removeBlock: (id: number) => void;
  favorites: WeatherData[];
  setFavorites: React.Dispatch<React.SetStateAction<WeatherData[]>>;
};

const WeatherBlock: React.FC<WeatherBlockProps> = ({
  id,
  city,
  removeBlock,
  favorites,
  setFavorites,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"day" | "5day">("day");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherResponse = await getWeatherByCity(city);
        setWeather(weatherResponse.data);

        const forecastResponse = await getWeatherForecast(city);
        setForecast(forecastResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const addToFavorites = () => {
    if (favorites.length >= 5) {
      setShowModal(true);
      return;
    }
    if (weather) {
      setFavorites([...favorites, weather]);
    }
  };

  const removeFromFavorites = () => {
    setFavorites(favorites.filter((fav) => fav.name !== city));
  };

  const toggleView = () => {
    setView(view === "day" ? "5day" : "day");
  };

  const generateDailyForecast = () => {
    if (!weather) return { city: { name: "", country: "" }, list: [] };

    const now = new Date();
    const hourlyForecast = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(now.getTime());
      date.setHours(index, 0, 0, 0);

      const tempFluctuation = Math.sin((index / 24) * Math.PI) * 5;
      const temperature = weather.main.temp + tempFluctuation;

      return {
        dt: date.getTime() / 1000,
        main: {
          temp: temperature,
          feels_like: temperature,
          temp_min: temperature,
          temp_max: temperature,
          pressure: weather.main.pressure || 1013,
          humidity: weather.main.humidity || 50,
        },
        weather: weather.weather,
        clouds: { all: 0 },
        wind: { speed: 0, deg: 0 },
        dt_txt: date.toISOString(),
      };
    });

    return {
      city: { name: weather.name, country: weather.sys.country },
      list: hourlyForecast,
    };
  };

  const isFavorite = favorites.some((fav) => fav.name === city);

  return (
    <div
      className={`${styles.weatherBlock} ${isFavorite ? styles.favorite : ""}`}
    >
      <div className={styles.blockAllButton}>
        <button className={styles.allButton} onClick={() => removeBlock(id)}>
          Видалити
        </button>
        <button className={styles.allButton} onClick={toggleView}>
          {view === "day"
            ? "Показати 5-денний прогноз"
            : "Показати денний прогноз"}
        </button>
      </div>
      {loading ? (
        <div className={styles.loader} />
      ) : (
        <>
          {weather && <WeatherCard weather={weather} />}
          {view === "5day" && forecast && <WeatherChart forecast={forecast} />}
          {view === "day" && (
            <WeatherChart forecast={generateDailyForecast()} />
          )}
          <div className={styles.blockAllButton}>
            <button className={styles.allButton} onClick={addToFavorites}>
              До улюбленого
            </button>
            {isFavorite && (
              <button
                className={styles.allButton}
                onClick={removeFromFavorites}
              >
                Видалити з улюбленого
              </button>
            )}
          </div>
        </>
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={() => setShowModal(false)}
        >
          Максимальна кількість улюблених міст 5
        </Modal>
      )}
    </div>
  );
};

export default WeatherBlock;

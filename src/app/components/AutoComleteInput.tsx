"use client";

import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { getCitySuggestions } from "../api/api";
import styles from "../page.module.css";
import { getLocationByIP } from "../api/api";

type AutoCompleteInputProps = {
  onSelect: (city: string) => void;
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line
  }, [query]);

  const fetchSuggestions = debounce(async (query: string) => {
    setLoading(true);
    try {
      const suggestions = await getCitySuggestions(query);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    onSelect(city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev !== null && prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex !== null) {
      handleSelect(suggestions[selectedIndex]);
    }
  };

  const handleAddCity = () => {
    if (query.trim() !== "") {
      onSelect(query);
      setQuery("");
    }
  };

  const handleLocateCity = async () => {
    setLoading(true);
    try {
      const city = await getLocationByIP();
      if (city) {
        setQuery(city);
        onSelect(city);
      }
    } catch (error) {
      console.error("Error determining city location:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
        className={styles.autoCompleteInput}
      />
      {loading && <div className={styles.loader} />}
      {suggestions.length > 0 && !loading && (
        <ul className={styles.suggestions}>
          {suggestions.map((city, index) => (
            <li
              key={city}
              className={index === selectedIndex ? styles.selected : ""}
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.blockAllButton}>
        <button className={styles.allButton} onClick={handleAddCity}>
          Додати місто
        </button>
        <button className={styles.allButton} onClick={handleLocateCity}>
          Визначити місце
        </button>
      </div>
    </>
  );
};

export default AutoCompleteInput;

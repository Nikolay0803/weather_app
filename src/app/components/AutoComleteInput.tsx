// src/app/components/AutoCompleteInput.tsx
import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { getCitySuggestions } from "../api/api";
import styles from "../page.module.css";

type AutoCompleteInputProps = {
  onSelect: (city: string) => void;
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line
  }, [query]);

  const fetchSuggestions = debounce(async (query: string) => {
    const suggestions = await getCitySuggestions(query);
    setSuggestions(suggestions);
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
      {suggestions.length > 0 && (
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
      <button className={styles.allButton} onClick={handleAddCity}>
        Додати місто
      </button>
    </>
  );
};

export default AutoCompleteInput;

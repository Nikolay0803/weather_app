import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const TOKEN = process.env.NEXT_PUBLIC__IPINFO_TOKEN;

export const getWeatherByCity = (city: string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
};

export const getWeatherForecast = (city: string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
};

export const getCitySuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=30&appid=${API_KEY}`
    );
    return response.data.list.map((item: any) => item.name);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

export const getLocationByIP = async () => {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${TOKEN}`);
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.error("Error fetching user location:", error);
    return "";
  }
};




import axios from "axios";
import { useEffect, useState } from "react";

export default function useContries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return countries;
}

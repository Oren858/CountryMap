// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FetchCountries from "./Components/FetchCountries";
import DetailCountry from "./Components/DetailCountry";
import useCountries from './Hooks/useCountries';



const App = () => {
  const countries=useCountries();

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FetchCountries countries={countries}/>} />
          <Route path="/countries/:nom" element={<DetailCountry countries={countries} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

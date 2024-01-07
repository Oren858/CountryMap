// TheMain.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FetchCountries from './FetchCountries';
import DetailCountry from './DetailCountry';

const TheMain = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCloseMap = () => {
    setSelectedCountry(null);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/countries"
            element={<FetchCountries setSelectedCountry={setSelectedCountry} />}
          />
          {selectedCountry && (
            <Route
              path={`/countries/${selectedCountry.name.common}`}
              element={<DetailCountry selectedCountry={selectedCountry} onCloseMap={handleCloseMap} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default TheMain;

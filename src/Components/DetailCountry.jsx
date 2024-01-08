import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const DetailCountry = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [mapSettings, setMapSettings] = useState({
    center: [0, 0],
    zoom: 9,
  });

  const { nom } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef();

  useEffect(() => {
    const filtredCountry = countries.filter(
      (country) => country.name.common === nom
    );
    setSelectedCountry(...filtredCountry);
  }, [nom]);

  useEffect(() => {
    if (selectedCountry) {
      setMapSettings({
        ...mapSettings,
        center: [selectedCountry.latlng[0], selectedCountry.latlng[1]],
      });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (mapRef.current && mapSettings.center[0]) {
      mapRef.current.flyTo(mapSettings.center, mapSettings.zoom);
    }
  }, [mapSettings]);
  
  const handleGoToCountryList = () => {
    navigate(-1);
  };

  return (
    <>
      {selectedCountry && (
        <>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {nom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedCountry.area}
              </Typography>
            </CardContent>
          </Card>

          {mapSettings.center[0] && (
            <MapContainer
              whenCreated={(map) => {
                mapRef.current = map;
              }}
              center={mapSettings.center}
              zoom={mapSettings.zoom}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker position={mapSettings.center}>
                <Popup>
                  <div>
                    <Typography variant="h6">
                      {selectedCountry.name.common}
                    </Typography>
                    <Typography variant="body2">
                      {selectedCountry.area}
                    </Typography>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          )}

          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Name: {selectedCountry.name.common}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Area: {selectedCountry.area}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Region: {selectedCountry.region}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Population: {selectedCountry.population}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}

      <div>
        <button onClick={handleGoToCountryList}>Go to Country List</button>
      </div>
    </>
  );
};

export default DetailCountry;

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";


const DetailCountry = () => {
  const selectedCountry=useSelector(state=>state.country.selectedCountry);
  const navigate = useNavigate();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current ) {
      mapRef.current.flyTo(selectedCountry.latlng, selectedCountry.zoom);
    }
  }, [selectedCountry]);
  
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
                {selectedCountry.name.common}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedCountry.area}
              </Typography>
            </CardContent>
          </Card>

          {selectedCountry.latlng && (
            <MapContainer
              whenCreated={(map) => {
                mapRef.current = map;
              }}
              center={selectedCountry.latlng}
              zoom={9}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker position={selectedCountry.latlng}>
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

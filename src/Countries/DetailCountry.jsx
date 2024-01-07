// DetailCountry.jsx
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DetailCountry = ({ selectedCountry }) => {
  const { nom } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const mapRef = useRef();

  const mapSettings = {
    center: [selectedCountry.latlng[0], selectedCountry.latlng[1]],
    zoom: 6,
  };

  useEffect(() => {
    if (mapRef.current) {
      // Fly to the selected country on the initial render
      mapRef.current.flyTo(mapSettings.center, mapSettings.zoom);
    }
  });

  const handleGoToCountryList = () => {
    // Use navigate(-1) to go back
    navigate(-1);
  };

  

  return (
    <div>
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

      <MapContainer
        whenCreated={(map) => {
          // Assign the map to the ref when it's created
          mapRef.current = map;
        }}
        center={mapSettings.center}
        zoom={mapSettings.zoom}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={mapSettings.center}>
          <Popup>
            <div>
              <Typography variant="h6">{selectedCountry.name.common}</Typography>
              <Typography variant="body2">{selectedCountry.area}</Typography>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <div>
        <button onClick={handleGoToCountryList}>Go to Country List</button>
      </div>
    </div>
  );
};

export default DetailCountry;

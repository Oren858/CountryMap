import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../utils/features/countrySlice';


const FetchCountries = ({countries}) => {
  const dispatch=useDispatch();
  const handleCardClick = (country) => {
      dispatch(setSelectedCountry(country))
  };

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {countries.map((c) => (
          <Marker
            key={c.name.common}
            position={[c.latlng[0], c.latlng[1]]}
          >
            <Popup>
              <div>
                <Typography variant="h6">{c.name.common}</Typography>
                <Typography variant="body2">{c.area}</Typography>
              </div>
            </Popup>
            </Marker>
        ))}
        </MapContainer>

        <div>
        {countries.map((country) => (
          <div key={country.name.common} onClick={() => handleCardClick(country)}>
            <Link to={`/countries/${country.name.common}`}>
                  <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {country.area}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchCountries;

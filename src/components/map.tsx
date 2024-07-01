import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/marker.svg"

interface Props{
  position: [number, number];
}

const customMarker=L.icon({
  iconUrl: icon,
  iconSize: [32, 32],
})

const MyMap = ({position}:Props) => {
  return (
    <MapContainer center={position} zoom={6} style={{height: "50vh", width: "50vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customMarker}/>
      </MapContainer>
  );
};

export default MyMap;

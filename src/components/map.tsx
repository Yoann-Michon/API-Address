import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props{
  position: [number, number];
}

const MyMap = ({position}:Props) => {
  return (
    <MapContainer center={position} zoom={6} style={{height: "50vh", width: "50vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}/>
      </MapContainer>
  );
};

export default MyMap;

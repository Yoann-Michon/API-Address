import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/marker.svg"
import { Props } from "../interfaces/Iprops";
import DrawRoute from "./routing";


const customMarker=L.icon({
  iconUrl: icon,
  iconSize: [32, 32],
})

const MyMap = ({ position, start, end }: Props) => {
  return (
    <MapContainer center={position} zoom={6} style={{ height: "50vh", width: "50vw" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {start && <Marker position={start} icon={customMarker}/>}
      {end && <Marker position={end} icon={customMarker}/>}
      {start && end && <DrawRoute start={start} end={end} />}
    </MapContainer>
  );
};

export default MyMap;
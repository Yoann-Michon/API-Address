import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Routing } from "../interfaces/Irouting";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

const DrawRoute = ({ start, end }: Routing) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      show:false,
    }).addTo(map);

    console.log(routingControl);
    
    return () => {
      
      try {
        map.removeControl(routingControl);
      } catch (error) {
        console.error('Erreur lors de la suppression du contrôle de routage:', error);
      }
    };
  }, [map, start, end]);

  return null;
};

export default DrawRoute;
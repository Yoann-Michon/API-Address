import { useState } from 'react';
import './App.css';
import { Adresse } from './interfaces/Iadresse';
import MyMap from './components/map';


function App() {
  const [adresses, setAdresses] = useState<Adresse[]>([]);
  const [startAdresse,setStartAdresse] = useState<Adresse | null>(null)
  const [endAdresse,setEndAdresse] = useState<Adresse | null>(null)
  const [searchMode, setSearchMode] = useState<string>("");
  const [region] = useState<[number, number]>([46.603354, 1.888334]);

  async function getAdresse(adr: string) {
    if (adr.length < 3) return;

    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${adr}`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des données.");

      const datas = await response.json();
      const newAdr = datas.features.map((data: any) => ({
        label: data.properties.label,
        coord: [data.geometry.coordinates[1], data.geometry.coordinates[0]],
      }));

      setAdresses(newAdr);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '300px', marginBottom:20 }}>
        <h1>Entrer une adresse</h1>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"space-around",height:"200px"}}>
          <label htmlFor="start_dest">Départ</label>
          <input
            name="start_dest"
            style={{ height: "30px", width: "300px", padding: "0px 20px", fontSize: "15px", fontWeight: "600", letterSpacing: "2px" }}
            placeholder={"Start"}
            value={startAdresse?.label}
            onChange={(e) => {
              setSearchMode("start");
              getAdresse(e.target.value);
            }}
          />
          <label htmlFor="end_dest">Arrivée</label>
          <input
            name="end_dest"
            style={{ height: "30px", width: "300px", padding: "0px 20px", fontSize: "15px", fontWeight: "600", letterSpacing: "2px" }}
            value={endAdresse?.label}
            placeholder={"End"}
            onChange={(e) => {
              setSearchMode("end");
              getAdresse(e.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', cursor: "pointer" }}>
        {adresses.map((item, index) => (
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            key={index}
            onClick={() => {
              if (searchMode === "start") {
                setStartAdresse(item);
              } else {
                setEndAdresse(item);

              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <MyMap position={region} start={startAdresse?.coord || null} end={endAdresse?.coord || null} />
    </>
  );
}

export default App;

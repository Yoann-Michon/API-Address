import { useState } from 'react'
import './App.css'
import { Adresse } from './type';
import MyMap from './components/map';


function App() {
  const [adresses, setAdresses] = useState<Adresse[]>([]);
  // Position initiale de la carte lat et long
  const [location, setLocation]= useState<[number,number] | null >(null);
  const [region] = useState<[number,number]>([46.603354,1.888334]);

  async function getAdresse(adr: string) {
    try {
      //s'il y a moins de 3 caractères dans le champs
      // on ne fait rien
      if (adr.length<3){
        return 
      }
      // Appelle a l'api en lui passant l'adresse en params
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${adr}`
      );

      // verification de la reponse de l'api (status 200)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }
      const datas = await response.json();
      // console.log(JSON.stringify(datas, null, 2));
      console.log(datas);
      
      const newAdr = datas.features.map((data: any) => ({
        label: data.properties.label,
        coord: [data.geometry.coordinates[1],data.geometry.coordinates[0]],
      }));

      setAdresses(newAdr);
      console.log(newAdr);
      

    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      return null;
    }
  }

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '300px' }}>

    <h1>Entrer une adresse</h1>
      <input style={{ height: "30px", width: "300px", padding: "0px 20px", fontSize: "15px", fontWeight: "600", letterSpacing: "2px" }}
      placeholder={"Search here"}
      onChange={(e) => {
        getAdresse(e.target.value);
        }}
        />
        </div>
      <div style={{display: 'flex', flexDirection: 'column',cursor:"pointer"}}>

      {adresses.map((item, index) => (
        <button
        style={{backgroundColor:"transparent", border:"none"}}
        key={index}
        onClick={()=>{setLocation(item.coord)}}
        >
          {item.label}
        </button>
      ))}
    </div>

    <MyMap position={location || region}/>
    </>
  )
}



export default App

import { useState } from 'react'
import './App.css'

type Adresse = {
  label: string;
};

function App() {
  const [adresses, setAdresses] = useState<Adresse[]>([]);

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
      console.log(adr.length);

      // verification de la reponse de l'api (status 200)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }
      const datas = await response.json();
      // console.log(JSON.stringify(datas, null, 2));
      
      const newAdr = datas.features.map((data: any) => ({
        label: data.properties.label,
      }));

      setAdresses(newAdr);

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
        onClick={()=>{alert(`Vous avez selectionné: ${item.label}`)}}
        >
          {item.label}
        </button>
      ))}
    </div>
    </>
  )
}



export default App

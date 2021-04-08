import React, { useEffect, useState } from "react";
import Clima from "./components/Clima";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Error from "./components/Error";

function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);

  const [resultado, setResultado] = useState({});

  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "22233fe05393c911c38f09448e628c84";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);

        //Detectar si el resultado fue exitoso o no
        if(resultado.cod === "404"){
          setError(true);
        } else {
          setError(false);
        }

      }

    };
    consultarAPI();
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultado" />
  } else {
    componente =  <Clima 
                    resultado={resultado}
                  />
  }

  return (
    <>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

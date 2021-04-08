import React, { useState } from "react";
import Error from "./Error";


const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  const [error, setError] = useState(false);

  // Extraer Ciudad y Pais
  const { ciudad, pais } = busqueda;

  //Almacenar en el State
  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario da submit al boton
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return;
    }

    setError(false);
    //Pasar al componente principal
    setConsultar(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos componentes son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">-- Seleccione un País --</option>
          <option value="US">Estados Unidos</option>
          <option value="CL">Chile</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="VE">Venezuela</option>
        </select>
        <label htmlFor="pais">Pais: </label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        > Buscar Clima</button>
      </div>
    </form>
  );
};

export default Formulario;

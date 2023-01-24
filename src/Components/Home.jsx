import React, { Fragment, useEffect, useState } from "react";
import { casoPrueba1, casoPrueba2 } from "../Services/TestCases";
import { getToken } from "../Services/ApiRest";

const Home = () => {
  const [token, setToken] = useState('');

  const [casos, setCasosPrueba] = useState('caso1');

  const [formData, setFormData] = useState({
    id: '',
  });

  useEffect(() => {
    console.log(window.location.href);
    if (window.location.href.split("#").length > 1) {
      setToken(window.location.href.split("#")[1].split("&")[0].split("=")[1]);
    }
  }, []);

  const casosPrueba = async () => {
    if (token === "") {
      alert("Genere un token");
      return;
    }

    switch (casos) {
      case "caso1":
        try {
          const caso1 = await casoPrueba1();
          return caso1;
        } catch (error) {
          console.log(error);
        }
        break;
      case "caso2":
        try {
          const caso2 = await casoPrueba2(formData.id);
          return caso2;
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <div>
        {token === "" ? <p>Genere un token por favor</p> : <p>{token}</p>}
        <button
          className="btn btn-primary"
          onClick={async (data) => {
            data = await getToken();
            setToken(data.access_token);
          }}
        >
          GENERAR TOKEN
        </button>
        <br />
        <h2>CASOS DE PRUEBA</h2>

        <br />
        <select
          name="select"
          onChange={(event) => {
            setCasosPrueba(event.target.value);
          }}
        >
          <option value="caso1">1° Endpoint</option>
          <option value="caso2">2° Endpoint</option>
        </select>
        <br />
        <label>
          Si desea obtener los videos del juego ingrese Id del Juego
        </label>
        <input
          type="text"
          onChange={(event) => {
            setFormData({ ...formData, id: event.target.value });
          }}
        />
        <br />
        <button
          className="btn btn-secondary"
          onClick={() => {
            casosPrueba();
          }}
        >
          OBTENER
        </button>
      </div>
    </Fragment>
  );
};

export default Home;

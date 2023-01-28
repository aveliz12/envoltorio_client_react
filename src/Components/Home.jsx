import React, { useEffect, useState } from "react";
import {
  casoPrueba1,
  casoPrueba2,
  casoPrueba3,
  casoPrueba4,
  casoPrueba5,
} from "../Services/TestCases";
import { getToken } from "../Services/ApiRest";
import "../Styles/Home.scss";

const Home = () => {
  const [token, setToken] = useState("");
  const [casos, setCasosPrueba] = useState("caso1");

  const [formData, setFormData] = useState({
    id: "",
  });

  useEffect(() => {
    if (window.location.href.split("#").length > 1) {
      setToken(window.location.href.split("#")[1].split("&")[0].split("=")[1]);
    } else if (localStorage.getItem("token") !== null) {
      setToken(localStorage.getItem("token"));
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
        const caso2 = await casoPrueba2(formData.id);
        return caso2;

      case "caso3":
        const caso3 = await casoPrueba3(formData.id);
        return caso3;

      case "caso4":
        const caso4 = await casoPrueba4(formData.id);
        return caso4;

      case "caso5":
        const caso5 = await casoPrueba5(formData.id);
        return caso5;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div>
        {token === "" ? (
          <h5>Genere un token por favor</h5>
        ) : (
          <p>Su token generado es: {token}</p>
        )}
      </div>
      <div className="buttonToken">
        <button
          className="btn btn-primary btnToken"
          onClick={async (data) => {
            data = await getToken();
            setToken(data.access_token);
          }}
        >
          GENERAR TOKEN
        </button>
      </div>
      <hr />
      <h4>CASOS DE PRUEBA</h4>

      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        name="select"
        onChange={(event) => {
          setCasosPrueba(event.target.value);
        }}
      >
        <option value="caso1">1° Caso - Transmisiones en vivo</option>
        <option value="caso2">2° Caso - Videos por Juego</option>
        <option value="caso3">3° Caso - Información del canal</option>
        <option value="caso4">4° Caso - Clips por usuarios</option>
        <option value="caso5">5° Caso - Información de juego</option>
      </select>
      <br />
      <label>Si desea obtener los videos del juego ingrese Id del Juego</label>
      <input
        type="text"
        onChange={(event) => {
          setFormData({ ...formData, id: event.target.value });
        }}
      />
      <div className="buttonGet">
        <button
          className="btn btn-secondary btnConsulta"
          onClick={() => {
            casosPrueba();
          }}
        >
          OBTENER
        </button>
      </div>
    </div>
  );
};

export default Home;

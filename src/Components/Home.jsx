import React, { Fragment } from "react";

const Home = () => {
  //Variables
  const urlToken = "https://id.twitch.tv/oauth2/token";
  const params = new URLSearchParams();
  params.append("client_id", "a2bf4j1rhkytvzoc4ortzn7m4yxg33");
  params.append("client_secret", "ri98723b3c639ub3zgltykc2znqicu");
  params.append("grant_type", "client_credentials");

  //Funcion Obtener token
  const getToken = async () => {
    const response = await fetch(urlToken, {
      method: "POST",
      body: params,
    });

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    console.log(data);
  };

  //Funcion obtener LiveStreams
  const getLiveStreams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api.twitch.tv/helix/streams", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": "a2bf4j1rhkytvzoc4ortzn7m4yxg33",
        },
      });
      const dataLiveStreams = await response.json();
      console.log(dataLiveStreams.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div>
        <button className="btn btn-primary" onClick={getToken}>
          Generar Token
        </button>
        <br />
        <br />
        <button className="btn btn-secondary" onClick={getLiveStreams}>
          Obtener LiveStreams
        </button>
      </div>
    </Fragment>
  );
};

export default Home;

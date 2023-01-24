//Variables
const url = "https://api.twitch.tv/helix/";
const params = new URLSearchParams();
params.append("client_id", "a2bf4j1rhkytvzoc4ortzn7m4yxg33");
params.append("client_secret", "ri98723b3c639ub3zgltykc2znqicu");
params.append("grant_type", "client_credentials");

//Solicitar Token
//Funcion Obtener token
export const getToken = async () => {
  const urlToken = "https://id.twitch.tv/oauth2/token";

  const response = await fetch(urlToken, {
    method: "POST",
    body: params,
  });

  const data = await response.json();
  localStorage.setItem("token", data.access_token);
  console.log(data);
  return data;
};

//Funcion obtener LiveStreams
export const getLiveStreams = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${url}streams`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Client-Id": "a2bf4j1rhkytvzoc4ortzn7m4yxg33",
      },
    });
    const dataLiveStreams = await response.json();
    //console.log(dataLiveStreams.data);
    return dataLiveStreams.data;
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer VideosByGame
export const getVideosByGame = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${url}videos?game_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer" + token,
        "Client-Id": "a2bf4j1rhkytvzoc4ortzn7m4yxg33",
      },
    });

    const dataVideosByGame = await response.json();
    return dataVideosByGame;
  } catch (error) {
    console.log(error);
  }
};

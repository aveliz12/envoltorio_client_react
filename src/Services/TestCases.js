import {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} from "../Services/ApiRest";

export const casoPrueba1 = async () => {
  const data = await getLiveStreams();
  console.log(data);
  return data;
};

export const casoPrueba2 = async () => {
  const dataLiveStreams = await casoPrueba1();
  const idGame = dataLiveStreams.map((resp) => resp.game_id);
  const dataVideosByGame = idGame.map(async (game_id) => {
    return await getVideosByGame(game_id);
  });

  //Promise all sirve para sacar los datos almacenados
  const allDataVideosByGame = await Promise.all(dataVideosByGame);
  console.log(allDataVideosByGame);
  return allDataVideosByGame;
};

export const casoPrueba3 = async () => {
  const dataVideosByGame = await casoPrueba2();

  const idUser = [];
  dataVideosByGame.forEach((id) => {
    id.map((resp) => idUser.push(resp.user_id));
  });

  const dataInformationChannel = idUser.map(async (_id) => {
    return await getInformationChannel(_id);
  });

  const allDataInformationChannel = await Promise.all(dataInformationChannel);
  console.log(allDataInformationChannel);
  return allDataInformationChannel;
};

export const casoPrueba4 = async () => {
  const dataChannelInformation = await casoPrueba3();

  const broadcasterId = [];

  dataChannelInformation.forEach((id) => {
    const data = Array.from(id.data);
    data.map((resp) => broadcasterId.push(resp.broadcaster_id));
  });

  const dataClipsByUser = broadcasterId.map(async (_id) => {
    return await getClipsByUser(_id);
  });

  const allDataClipsByUser = await Promise.all(dataClipsByUser);
  console.log(allDataClipsByUser);
  return allDataClipsByUser;
};

export const casoPrueba5 = async () => {
  const dataClipsByUser = await casoPrueba4();

  const dataGame = [];

  dataClipsByUser.forEach((id) => {
    const data = Array.from(id.data);
    data.map((resp) => dataGame.push(resp.game_id));
  });

  const dataInformationGame = dataGame.map(async (_id) => {
    return await getInformationGame(_id);
  });

  const allData = await Promise.all(dataInformationGame);
  console.log(allData);
  return allData;
};

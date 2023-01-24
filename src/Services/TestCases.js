import { getLiveStreams, getVideosByGame } from "../Services/ApiRest";

export const casoPrueba1 = async () => {
  const data = await getLiveStreams();
  console.log(data);
  return data;
};

export const casoPrueba2 = async () => {
  const dataLiveStreams = await casoPrueba1();
  const idGame = dataLiveStreams.map((resp) => resp.game_id);
  // const dataVideosByGame = idGame.map(async (game_id) => {
  //   return await getVideosByGame(game_id);
  // });

  const dataVideosByGame = await getVideosByGame(idGame[0]);

  //const allDataVideosByGame = await Promise.all(dataVideosByGame);
  console.log(dataVideosByGame);

  //return allDataVideosByGame;
};

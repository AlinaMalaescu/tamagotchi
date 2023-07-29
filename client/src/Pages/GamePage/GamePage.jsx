import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tamagotchi from '../../Components/Tamagotchi/Tamagotchi'
import GameOver from '../../Components/GameOver/GameOver'



const handleAnonimusPlayer = (player) => {

    return fetch("http://localhost:8080/api/anonimus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({player}),
    }).then((res) => res.json());
  };

  const updatePlayer = (updatedPlayer) => {
  
    return fetch(`http://localhost:8080/api/player/${updatedPlayer.name}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlayer),
    }).then((res) => res.json());
}

const getPlayer =  async (player) => {
  console.log(player);

    if (player.name === 'anonimus') {
      console.log('yes');
      return handleAnonimusPlayer(player);
    } else {
        return fetch(`http://localhost:8080/api/player/${player.name}`).then((res) => res.json());
      }
  }

  const calculateLifeCycle = (player) => {
    const currentTime =  Date.now();
   //hours since creation
    const unitsOfLife = Math.floor((currentTime - new Date(player.tamagotchi.created))/3600000);
    console.log("these are the units: " + unitsOfLife);
  //every stage has 4 hours, representing a life cycle
    const lifeStage = Math.ceil(unitsOfLife/4);
   console.log("this is the lifestage " +lifeStage)

    switch (lifeStage) {
      case 0 : return 'baby';
      case 1 : return 'baby';
      case 2 : return 'teenager';
      case 3 : return 'adult';
      case 4 : return 'senior';
      case 5 : return 'dead';
      default: return 'unknown';
    }

  }

  const calculateGameAbsence = (player) => {
    const currentTime =  Date.now();

    const roundsOfUp = Math.floor((currentTime - new Date(player.tamagotchi.created))/120000);

    console.log("roundsOfUpdates" + roundsOfUp);

    const roundsOfUpdates = Math.floor((currentTime - new Date(player.tamagotchi.updated))/120000);

    console.log("roundsOfUpdates" + roundsOfUpdates);

    const lostPoints = roundsOfUpdates * 10;

    console.log("lostPoints" + lostPoints);

    const updatedPlayer = {
      ...player,
      tamagotchi: {
        ...player.tamagotchi,
        health: player.tamagotchi.health - lostPoints >= 0? player.tamagotchi.health - lostPoints : 0,
        happiness: player.tamagotchi.happiness - lostPoints >=0? player.tamagotchi.happiness - lostPoints : 0,
        cleanliness: player.tamagotchi.cleanliness - lostPoints >=0? player.tamagotchi.cleanliness - lostPoints : 0},
      }

      console.log(updatedPlayer);

     return updatedPlayer;
  }



const GamePage = () => {

  const [player, setPlayer] = useState(null);
  const [dead, setDeath] = useState(false);
  const [lifeCycle, setLifeCycle] = useState(null);

  const { name } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const playerName = params.get('playerName');

  console.log("aici s-a gasit numele din query: " + playerName);
 
    useEffect(() => {     
          getPlayer({ name: `${playerName}` })
          .then((data) => {
            const evaluatedPlayer = calculateGameAbsence(data);
          
            if (evaluatedPlayer.tamagotchi.health === 0 ||
                evaluatedPlayer.tamagotchi.happiness === 0 ||
                evaluatedPlayer.tamagotchi.cleanliness === 0) {
                setPlayer(evaluatedPlayer);
                setDeath(true);
              } else {
                setPlayer(evaluatedPlayer);
                setLifeCycle(calculateLifeCycle(evaluatedPlayer));
              }          
          })
  
      }, []);


  useEffect(() => {

    if (player) {
      const intervalId = setInterval(() => {
     
        console.log('EVRIKA!');

        if (
          player.tamagotchi.health > 10 &&
          player.tamagotchi.happiness > 10 &&
          player.tamagotchi.cleanliness > 10
        ) {
          
        //  let currentTime = Date.now();
          const updatedPlayer = {
            ...player,
            tamagotchi: {
              ...player.tamagotchi,
              health: player.tamagotchi.health - 10,
              happiness: player.tamagotchi.happiness - 10,
              cleanliness: player.tamagotchi.cleanliness - 10},
             }

          setPlayer(updatedPlayer);
          updatePlayer(updatedPlayer);

        } else {
          setDeath(true);
          clearInterval(intervalId); 
        }
      }, 120000);
      return () => clearInterval(intervalId);
    }
  }, [player]);

  return (
    <>
    {player && !dead && <Tamagotchi player={player} setPlayer={setPlayer} lifeCycle={lifeCycle}/>}
    {dead && <GameOver player={player} setPlayer={setPlayer}/>}
    </>
  )
}

export default GamePage
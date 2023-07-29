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



const GamePage = () => {

  const [player, setPlayer] = useState(null);
  const [dead, setDeath] = useState(false);

  const { name } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const playerName = params.get('playerName');
  
  console.log("aici s-a gasit numele din query: " + playerName);
 
    useEffect(() => {     
          getPlayer({ name: `${playerName}` })
          .then((data) => {
            setPlayer(data);
          })
      }, []);


  useEffect(() => {
    if (player) {
      const intervalId = setInterval(() => {
     
        if (
          player.tamagotchi.health > 0 &&
          player.tamagotchi.happiness > 0 &&
          player.tamagotchi.cleanliness > 0
        ) {
          
          const currentTime = Date.now();
          const updatedPlayer = {
            ...player,
            tamagotchi: {
              ...player.tamagotchi,
              health: player.tamagotchi.health - 10,
              happiness: player.tamagotchi.happiness - 10,
              cleanliness: player.tamagotchi.cleanliness - 10},
              updated: currentTime}

          setPlayer(updatedPlayer);
          updatePlayer(updatedPlayer);

        } else {
          setDeath(true);
          clearInterval(intervalId); 
        }
      }, 100000);
      return () => clearInterval(intervalId);
    }
  }, [player]);

  return (
    <>
    {player && !dead && <Tamagotchi player={player} setPlayer={setPlayer} />}
    {dead && <GameOver player={player} setPlayer={setPlayer}/>}
    </>
  )
}

export default GamePage
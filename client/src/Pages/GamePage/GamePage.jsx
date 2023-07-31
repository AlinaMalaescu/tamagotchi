import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tamagotchi from '../../Components/Tamagotchi/Tamagotchi'
import GameOver from '../../Components/GameOver/GameOver'
import Utils from '../../utils/Utils'


const GamePage = () => {

  const updatePlayer = async (updatedPlayer) => {
    
    return fetch(`http://localhost:8080/api/player/${updatedPlayer.name}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPlayer),
    }).then((res) => res.json());
}

  const [player, setPlayer] = useState(null);
  const [dead, setDeath] = useState(false);
  const [lifeCycle, setLifeCycle] = useState(null);

  const { name } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const playerName = params.get('playerName');
 
    useEffect(() => {     
          Utils.getPlayer({ name: `${playerName}` })
          .then((data) => {

            const evaluatedPlayer = Utils.updatePLayerAbsence(data, Utils.calculateGameAbsence);
            const lifeCycle = Utils.calculateLifeCycle(evaluatedPlayer);

            if (evaluatedPlayer.tamagotchi.health === 0 ||
                evaluatedPlayer.tamagotchi.happiness === 0 ||
                evaluatedPlayer.tamagotchi.cleanliness === 0 ||
                lifeCycle === 'dead' || lifeCycle === 'unknown') {

                setPlayer(evaluatedPlayer);
                setDeath(true);

              } else { 

                   setPlayer(evaluatedPlayer);
                   setLifeCycle(Utils.calculateLifeCycle(evaluatedPlayer));
              }          
          })
  
    }, []);


  useEffect(() => {

    if (player) {

      Utils.updatePlayer(player);
      setLifeCycle(Utils.calculateLifeCycle(player));

      }



      const interval = setInterval(() => {

        if (
          player.tamagotchi.health > 10 &&
          player.tamagotchi.happiness > 10 &&
          player.tamagotchi.cleanliness > 10
        ) {         
       
          const updatedPlayer = {
            ...player,
            tamagotchi: {
              ...player.tamagotchi,
              health: player.tamagotchi.health - 10,
              happiness: player.tamagotchi.happiness - 10,
              cleanliness: player.tamagotchi.cleanliness - 10},
             }

          setPlayer(updatedPlayer);
          setLifeCycle(Utils.calculateLifeCycle(player));

        } else {
          setDeath(true);
          clearInterval(interval); 
        }

      }, 3_600_000);
      return () => clearInterval(interval);

  }, [player]);

  return (
    <>
    {player && !dead && <Tamagotchi player={player} setPlayer={setPlayer} lifeCycle={lifeCycle}/>}
    {dead && <GameOver player={player} setPlayer={setPlayer} />}
    </>
  )
}

export default GamePage
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const GameOver = ({player}) => {

    const navigate =  useNavigate();
    const { name } = useParams();

    const deleteAnonimusPlayer = () => {
        console.log(player)
        return fetch("http://localhost:8080/api/anonimus", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
          }).then((res) => res.json());
    }

    const updateAnonimusPlayer = () => {
        const updatedPlayer =
        {...player, tamagotchi : {
                                health: 100,
                                happiness: 100,
                                cleanliness: 100,
                                created: Date.now()}
        };
         
         
        return fetch(`http://localhost:8080/api/player/${player.name}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPlayer),
          }).then((res) => res.json());
    }

    const handleNewPet = () => {
        updateAnonimusPlayer();
        console.log("incearca saracul")
        window.location.reload(); 
    };

    const handleQuit = () => {
        deleteAnonimusPlayer();
        navigate("/");
    }

  return (
    <div>
        <h1>Your pet died</h1>
        <button onClick= {handleNewPet}>GET NEW PET</button>
        <button onClick= {handleQuit}>QUIT</button>      
    </div>
  )
}

export default GameOver
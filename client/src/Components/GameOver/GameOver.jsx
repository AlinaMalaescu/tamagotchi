import React from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import styles from './GameOver.module.css'

const GameOver = ({player}) => {

    const navigate =  useNavigate();
    const { name } = useParams();

    const deletePlayer = async () => {
        console.log(player)
       
        return fetch(`http://localhost:8080/api/player/${player.name}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
          }).then((res) => res.json());
    }

    const updateAnonimusPlayer = async () => {
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
        deletePlayer();
        navigate("/");
    }

  return (
    <div className = {styles.containerGameOver}>
        <h1>Your pet died. RIP </h1>
        <div className = {styles.containerGameOverButtons}>
        <button onClick= {handleNewPet}>GET NEW PET</button>
        <button onClick= {handleQuit}>QUIT</button>  
        </div>   
    </div>
  )
}

export default GameOver
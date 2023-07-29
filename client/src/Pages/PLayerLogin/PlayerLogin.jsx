import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../Components/LoginForm/LoginForm';
import styles from './PlayerLogin.module.css';



const searchPlayerByName = (player) => {
  return fetch(`http://localhost:8080/api/player/${player.name}`).then((res) => res.json());
}

const createPlayer = (player) => {

      return fetch("http://localhost:8080/api/player/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      })
      .then((res) => { res.json();})
      .catch((error) => { 
        console.error("Error while making the fetch request:", error);
      });
  };


const PlayerLogin = () => {

  const navigate =  useNavigate();

  const handleSignUp = async (player) => {

      const playerExists = await searchPlayerByName(player);
    
      if (playerExists) {
        window.alert('This username is not available!')
      } else {
        createPlayer(player);
        navigate(`/game?playerName=${player.name}`)
      }
  }

  return (
    <div className={styles.loginContainer}>
      <LoginForm handleSignUp = {handleSignUp}/>
    </div>
  )
}

export default PlayerLogin
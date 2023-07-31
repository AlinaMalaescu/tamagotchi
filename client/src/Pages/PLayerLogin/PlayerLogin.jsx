import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../Components/LoginForm/LoginForm';
import styles from './PlayerLogin.module.css';
import Utils from '../../utils/Utils'


const PlayerLogin = () => {

  const navigate =  useNavigate();

  const handleSignUp = async (player) => {
  
      const playerExists = await Utils.getPlayer(player);
    
      if (playerExists) {
        window.alert('This username is not available!')
      } else {  
        const newPlayer =  await Utils.createPlayer(player);
        navigate(`/game?playerName=${player.name}`)
      }
  }

  const handleLogin = async (player) => {

    const registeredPlayer = await Utils.getPlayer(player);
  
    if (registeredPlayer) {

      player.password === registeredPlayer.password ? 
             navigate(`/game?playerName=${registeredPlayer.name}`) : 
             window.alert('Incorrect password');
    } else {
      window.alert('There is no player with this name.');
    }
}

  return (
    <div className={styles.loginContainer}>
      <LoginForm handleSignUp = {handleSignUp} handleLogin={handleLogin}/>
    </div>
  )
}

export default PlayerLogin
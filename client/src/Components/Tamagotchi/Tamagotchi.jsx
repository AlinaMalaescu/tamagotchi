import React from 'react'

import styles from './Tamagotchi.module.css'

const Tamagotchi = ({player, setPlayer, lifeCycle}) => {

  const feedTamagotchi = () => {
    if (player.tamagotchi.health < 100) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        tamagotchi: {
          ...prevPlayer.tamagotchi,
          health: prevPlayer.tamagotchi.health + 10,
        },
      }));
    }
  };

  const playTamagotchi = () => {
    if (player.tamagotchi.happiness < 100) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        tamagotchi: {
          ...prevPlayer.tamagotchi,
          happiness: prevPlayer.tamagotchi.happiness + 10,
        },
      }));
    }
  };

  const cleanTamagotchi = () => {
    if (player.tamagotchi.cleanliness < 100) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        tamagotchi: {
          ...prevPlayer.tamagotchi,
          cleanliness: prevPlayer.tamagotchi.cleanliness + 10,
        },
      }));
    }
  };


  return (

    //applying different styling based on life stage
    <div className={lifeCycle === 'baby'?  styles.tamagotchiContainerBaby : lifeCycle === 'teenager'?  styles.tamagotchiContainerTeen : lifeCycle === 'adult'? styles.tamagotchiContainerAdult : styles.tamagotchiContainerSenior}>
    <div className={styles.buttonsContainer}>

    {player.name === 'anonimus' ? <h1>Welcome, Stranger!</h1> : <h1>Hello, {player.name}!</h1>}
      <h4>Health: {player.tamagotchi.health}</h4>
      <button onClick={feedTamagotchi}>Feed</button>

      <h4>Hapiness: {player.tamagotchi.happiness}</h4>
      {lifeCycle === 'baby' && <button onClick={playTamagotchi}>Play</button>}
      {lifeCycle === 'teenager' && <button onClick={playTamagotchi}>Study</button>}
      {lifeCycle === 'adult' && <button onClick={playTamagotchi}>Teach</button>}
      {lifeCycle === 'senior' && <button onClick={playTamagotchi}>Play</button>}

      <h4>Cleanliness: {player.tamagotchi.cleanliness}</h4>
      <button onClick={cleanTamagotchi}>Clean</button>
    </div>
       
        <img id="tamagotchi"/>
    </div>
  )
}

export default Tamagotchi
import React from 'react'
import { Link } from "react-router-dom";

import './MainPage.css'

const MainPage = () => {

  const handlePlay = () => {
    console.log('play')
  }

  const handleLogin = () => {
    console.log('login')
  }

  return (
    <div className='containerMain'>
      <div className='containerContent'>
        <h1>TAMAGOTCHI</h1>
        <Link to="/game?playerName=anonimus">
              <button className='buttons' type="button" onClick = {handlePlay}>PLAY</button>
        </Link>

        <Link to="/login">
              <button className='buttons' type="button" onClick = {handleLogin}>LOGIN</button>
        </Link>
    </div>
</div>
  )
}

export default MainPage
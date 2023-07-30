import React from 'react'
import { Link } from "react-router-dom";

import './MainPage.css'

const MainPage = () => {


  return (
    <div className='containerMain'>
      <div className='containerContent'>

        <Link to="/game?playerName=anonimus">
              <button className='buttons' type="button">PLAY</button>
        </Link>

        <Link to="/login">
              <button className='buttons' type="button">LOGIN</button>
        </Link>
    </div>
</div>
  )
}

export default MainPage
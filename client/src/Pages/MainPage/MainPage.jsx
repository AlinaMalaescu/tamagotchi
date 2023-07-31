import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import './MainPage.css'
import Utils from '../../utils/Utils'


const MainPage = () => {

  const navigate =  useNavigate();

  const handlePlay = async () => {
      const existingAnonimus = await Utils.getPlayer({ name: 'anonimus' })

      if (existingAnonimus)  {

        navigate(`/game?playerName=anonimus`);

      } else {

        await Utils.createPlayer ({ name: 'anonimus', password: ''});
        navigate(`/game?playerName=anonimus`);

      }
  }

  return (
    <div className='containerMain'>
      <div className='containerContent'>
        <button className='buttons' type='button' onClick={handlePlay}>
          PLAY
        </button>
        <Link to='/login'>
          <button className='buttons' type='button'>
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
};


export default MainPage
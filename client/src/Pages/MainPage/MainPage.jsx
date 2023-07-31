import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import './MainPage.css'

const createPlayer = async (player) => {

  return fetch("http://localhost:8080/api/player/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
  .then((res) => { res.json() })
  .catch((error) => { 
    console.error("Error while making the fetch request:", error);
  });
};

const searchPlayerByName = async (player) => {
return fetch(`http://localhost:8080/api/player/${player.name}`).then((res) => res.json());
}

const MainPage = () => {
  const navigate =  useNavigate();

  const handlePlay = async () => {

    const existingAnonimus = await searchPlayerByName({name: 'anonimus'});

    if (existingAnonimus)  {
      navigate(`/game?playerName=anonimus`);
    } else {
      const createAnonimus =  await createPlayer ({ name: 'anonimus',
                                                    password: ''   
                                                  });
      navigate(`/game?playerName=anonimus`);
    }

  }


  return (
    <div className='containerMain'>
      <div className='containerContent'>
         
         <button className='buttons' type="button" onClick={handlePlay}>PLAY</button>
        <Link to="/login">
            <button className='buttons' type="button">LOGIN</button>
        </Link>
      </div>
    </div>
  )
}

export default MainPage
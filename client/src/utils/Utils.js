class Utils {
    
    static createPlayer = async (player) => {

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
      
    static getPlayer = async (player) => {
      return fetch(`http://localhost:8080/api/player/${player.name}`).then((res) => res.json());
    }


    static updatePlayer = async (updatedPlayer) => {
    
        return fetch(`http://localhost:8080/api/player/${updatedPlayer.name}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayer),
        }).then((res) => res.json());
    }


  static calculateLifeCycle = (player) => {
    const currentTime =  Date.now();
   //hours since creation
    const unitsOfLife = Math.floor((currentTime - new Date(player.tamagotchi.created))/3600000);
    console.log("these are the units: " + unitsOfLife);
  //every stage has 4 hours, representing a life cycle
    const lifeStage = Math.ceil(unitsOfLife/1);
   console.log("this is the lifestage " +lifeStage)

    switch (lifeStage) {
      case 0 : return 'baby';
      case 1 : return 'teenager';
      case 2 : return 'adult';
      case 3 : return 'senior';
      case 4 : return 'dead';
      default: return 'unknown';
    }

  }

  static calculateGameAbsence = (player) => {

    const currentTime =  Date.now();
    const roundsOfUpdates = Math.floor((currentTime - new Date(player.tamagotchi.updated))/120000);
    console.log("rounds of updates " + roundsOfUpdates);
    console.log("points to be deducted " + roundsOfUpdates*10);

    return roundsOfUpdates * 10;;
  }


static updatePLayerAbsence = (player, calculateGameAbsence) => {

  const lostPoints = calculateGameAbsence(player);

   const updatedPlayer = {
      ...player,
      tamagotchi: {
        ...player.tamagotchi,
        health: player.tamagotchi.health - lostPoints >= 0? player.tamagotchi.health - lostPoints : 0,
        happiness: player.tamagotchi.happiness - lostPoints >=0? player.tamagotchi.happiness - lostPoints : 0,
        cleanliness: player.tamagotchi.cleanliness - lostPoints >=0? player.tamagotchi.cleanliness - lostPoints : 0},
      }

     return updatedPlayer;
}

}
  
  export default Utils;
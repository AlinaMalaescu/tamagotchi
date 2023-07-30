
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const PlayerModel = require("./db/player.model");



const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
  }));

  
app.get("/api/player/:name", async (req, res) => {

    try {
    const existingUser = await PlayerModel.findOne({name: req.params.name});
    return res.json(existingUser);

    } catch (err) {
      return next(err);
    }
});

app.post("/api/anonimus", async (req, res, next) => {
  try {
    const existingAnonimusUser = await PlayerModel.findOne({ name: "anonimus" });

    if (existingAnonimusUser) {
      return res.json(existingAnonimusUser);
    } else {
      const anonimusPlayer = {
        name: "anonimus",
        password: "",
        tamagotchi: {
          health: 100,
          happiness: 100,
          cleanliness: 100,
          created: Date.now(),
          updated: Date.now()
        },
      };
      const newAnonimusUser = await PlayerModel.create(anonimusPlayer);
      return res.json(newAnonimusUser);
    }
  } catch (err) {
    return next(err);
  }
});

app.post('/api/player/create', async (req, res, next) => {

  try {
      const newPlayer = {
        name: req.body.name,
        password: req.body.password,
        tamagotchi: {
          health: 100,
          happiness: 100,
          cleanliness: 100,
          created: Date.now(),
          updated: Date.now()
        },
      };
      const newlyCreatedPlayer = await PlayerModel.create(newPlayer);
      return res.json(newlyCreatedPlayer);
 
    } catch (err) {
      return next(err);
    }
});

app.patch("/api/player/:name", async (req, res, next) => {

  req.body.tamagotchi.updated = Date.now();

  try {
    const player = await PlayerModel.findOneAndUpdate(
      { name: req.params.name },
      { $set: { ...req.body } },
      { new: true }
    );

    return res.json(player);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/player/:name", async (req, res, next) => {
  console.log("s-a gasit de sters");
  try {
    
    console.log("se incearca")
    const player = await PlayerModel.findOne({name: req.params.name});
    console.log(player);
    const deleted = await player.deleteOne();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
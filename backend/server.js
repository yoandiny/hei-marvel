const express = require('express');
const manager = require('./manager')
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

app.get("/characters", async(req, res)=>{
   const data = await manager.loadCharacter();
  if (!data) {
    res.status(500).send("Erreur lors de la lecture du fichier");
  } else {
    res.json(data);
  }
});


app.listen(8080, ()=>{
    console.log('Server is on');
})
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

app.get('/characters/:id', async(req, res)=>{
  const id = req.params.id;
  const character = await manager.getCharacter(id);
  if(character){
    res.json(character);
  }else{
    res.status(404).send('Character not found');
  }
});

app.post('/characters', async(req, res)=>{
  const character = req.body;
  if (!character || !character.name || !character.realName || !character.universe) {
    return res.status(400).send('Character data is required');
  }
  await manager.createCharacter(character);
  res.status(201).send('Character created');
});

app.put('/characters/:id', async(req, res)=>{
  const id = req.params.id;
  const updatedCharacter = req.body;
  if (!updatedCharacter) {
    return res.status(400).send('Updated character data is required');
  }
  await manager.updateCharacter(id, updatedCharacter);
  res.send('Character updated');
});

app.delete('/characters/:id', async(req, res)=>{
  try {
    const id = req.params.id;
  await manager.deleteCharacter(id);
  res.status(200).send('Character deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting character');
    
  }
});


app.listen(8080, ()=>{
    console.log('Server is on');
})
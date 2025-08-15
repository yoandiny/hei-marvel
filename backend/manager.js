const fs = require("node:fs/promises");

const PATH = './characters.json';

 const loadCharacter = async() => {
    try {
    const raw = await fs.readFile(PATH, {encoding: 'utf-8'});
    return JSON.parse(raw).characters;
  } catch (err) {
    console.error("Erreur de lecture/parsing :", err.message);
    return null;
  }
    
}

const getCharacter = async(id)=>{
  try {
    const characters = await loadCharacter();
    const character = characters.find(c => c.id == parseInt(id));
    return character;
    
  } catch (error) {
    console.error(error);
    
  }
}

const createCharacter = async(character) => {
  try {
    const characters = await loadCharacter();
    const id = characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1;
    character = {id, ...character}; // Assign a new ID
    characters.push(character);
    await fs.writeFile(PATH, JSON.stringify({characters}));
  } catch (error) {
    console.error(error);
  }
}

const updateCharacter = async(id, updatedCharacter) => {
  try {
    const characters = await loadCharacter();
    const index = characters.findIndex(c => c.id == parseInt(id));
    characters[index] = updatedCharacter;
    await fs.writeFile(PATH, JSON.stringify({characters}));
  } catch (error) {
    console.error(error);
  }
}

const deleteCharacter = async(id) => {
  try {
    const characters = await loadCharacter();
    const updatedCharacters = characters.filter(c => c.id != parseInt(id));
    await fs.writeFile(PATH, JSON.stringify({characters: updatedCharacters}));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
    loadCharacter,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
}
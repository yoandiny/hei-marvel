const fs = require("node:fs/promises");

const PATH = './characters.json';

 const loadCharacter = async() => {
    try {
    const raw = await fs.readFile(PATH, {encoding: 'utf-8'});
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erreur de lecture/parsing :", err.message);
    return null;
  }
    
}

module.exports = {
    loadCharacter
}
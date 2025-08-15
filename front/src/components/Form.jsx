import { use, useState } from 'react';
import './styles/Form.css'

const Form = ({formMode}) => {
    const [editingCharacter] = useState(JSON.parse(localStorage.getItem("character")) || {});
    const [editForm, setEditForm] = useState({
        name: editingCharacter.name || '',
        realName: editingCharacter.realName || '',
        universe: editingCharacter.universe || ''
    });

    const [characterForm, setCharacterForm] = useState({
        name: '',
        realName: '',
        universe: ''
    })

  if(formMode === "create") {
    return (
      
    <form className="form-container">
        <label htmlFor="name">Nom</label>
      <input type="text" name='name' placeholder="Nom" value={characterForm.name} />
      <label htmlFor="realName">Nom de naissance</label>
      <input type="text" name='realName' placeholder="Nom de naissance" value={characterForm.realName} />
      <label htmlFor="universe">Univers</label>
      <input type="text" name='universe' placeholder="Univers" value={characterForm.universe} />
      <button type="submit">Créer</button>
    </form>
  
    );
  }else{
    return (
      <form className="form-container">
        <label htmlFor="name">Nom</label>
        <input type="text" name='name' placeholder="Nom" value={editForm.name} />
        <label htmlFor="realName">Nom de naissance</label>
        <input type="text" name='realName' placeholder="Nom de naissance" value={editForm.realName} />
        <label htmlFor="universe">Univers</label>
        <input type="text" name='universe' placeholder="Univers" value={editForm.universe} />
        <button type="submit">Modifier</button>
      </form>
    );
  }
}

export default Form

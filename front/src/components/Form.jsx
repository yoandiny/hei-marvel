import { use, useState } from 'react';
import './styles/Form.css'
import axios from 'axios';

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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacterForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = async()=>{
        try {
            const res = await axios.post("http://localhost:8080/characters", characterForm);
            if(res.status == 201){
                
                setCharacterForm({
                    name: '',
                    realName: '',
                    universe: ''
                });
                
                
            }
            
        } catch (error) {
            console.error("error :" + error)
        }
    }

    const updateCharacter = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/characters/${editingCharacter.id}`, editForm);
            if(res.status === 200){
                setEditForm({
                    name: '',
                    realName: '',
                    universe: ''
                });
                localStorage.removeItem("character");
            }
            
        } catch (error) {
            console.error("Error updating character:", error);
        }
    }

  if(formMode === "create") {
    return (
      
    <form className="form-container">
        <label htmlFor="name">Nom</label>
      <input type="text" name='name' placeholder="Nom" value={characterForm.name} onChange={handleChange} />
      <label htmlFor="realName">Nom de naissance</label>
      <input type="text" name='realName' placeholder="Nom de naissance" value={characterForm.realName} onChange={handleChange} />
      <label htmlFor="universe">Univers</label>
      <input type="text" name='universe' placeholder="Univers" value={characterForm.universe} onChange={handleChange} />
      <button onClick={handleCreate} type="submit">Créer</button>
    </form>
  
    );
  }else{
    return (
      <form className="form-container">
        <label htmlFor="name">Nom</label>
        <input type="text" name='name' placeholder="Nom" value={editForm.name} onChange={handleEditChange} />
        <label htmlFor="realName">Nom de naissance</label>
        <input type="text" name='realName' placeholder="Nom de naissance" value={editForm.realName} onChange={handleEditChange} />
        <label htmlFor="universe">Univers</label>
        <input type="text" name='universe' placeholder="Univers" value={editForm.universe} onChange={handleEditChange} />
        <button type="submit">Modifier</button>
      </form>
    );
  }
}

export default Form

import { useEffect, useState } from "react";
import './styles/List.css';
import axios from 'axios'

const List = ({setFormMode})=> {
    const [data, setData] = useState([]);

    const setModificationMode = async(id) => {
        
        try {
            const res = await axios.get(`http://localhost:8080/characters/${id}`);
        if(res.status === 200){
            setFormMode("update");
            localStorage.setItem("character", JSON.stringify(res.data));
        }
        } catch (error) {
            console.error("Error fetching character for modification:", error);
            if(error.response && error.response.data) {
                console.error("Error details:", error.response.data);
            }
            
        }
    }
  

    const getCharacters = async () =>{
        try {
            const res = await axios.get('http://localhost:8080/characters');
            if(res.status === 200){
                setData(res.data);
        }
        } catch (error) {
            if(res.err){
                console.log(res.err);
            }
            
        }
    }

    const deleteCharacter = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/characters/${id}`);
            if(res.status === 200){
                setData(data.filter(character => character.id !== id));
            }
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    }

    useEffect(()=>{
      getCharacters();

    },[])

  return (
    <div>
      <h1>MCU Characters list</h1>

      <div className="list-container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Real name</th>
                    <th>Universe</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((character) => (
                    <tr key={character.id}>
                        <td>{character.name}</td>
                        <td>{character.realName}</td>
                        <td>{character.universe}</td>
                        <td>
                            <button onClick={() => setModificationMode(character.id)}><i class='bx bx-pencil'></i></button>
                            <button onClick={() => deleteCharacter(character.id)}> <i class='bx bx-trash' ></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default List;

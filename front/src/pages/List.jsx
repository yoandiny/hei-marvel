import { useEffect, useState } from "react";
import axios from 'axios'

export const List = ()=> {
    const [data, setData] = useState([]);

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

    useEffect(()=>{

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
        </table>
      </div>
      
    </div>
  )
}

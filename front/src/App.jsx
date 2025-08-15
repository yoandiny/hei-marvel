import { useState } from 'react'
import './App.css'
import List from './components/List';
import Form from './components/Form';

function App() {
  const [formMode, setFormMode] = useState("create");
  

  return (
    <>
      <List setFormMode={setFormMode} />
      <Form formMode={formMode} />
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';
import axios from 'axios';
import './App.css';

const addToDoApi = async (toDo) => {
  try {
    const res = await axios.post("http://localhost:3000/todos", { work: toDo });
    console.log(res);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};

const getToDosApi = async () => {
  try {
    const res = await axios.get("http://localhost:3000/todos");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

const App = () => {
  const [toDos, setToDos] = useState([]);
  const addToDo = async (toDo) => {
    const success = await addToDoApi(toDo);
    if (success) {
      const newToDos = [...toDos, { work: toDo }];
      setToDos(newToDos);
    };
    return success;
  };
  useEffect(async () => {
    const data = await getToDosApi();
    setToDos(data)
  }, []);

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <AddToDo onSubmit={addToDo} />
      <ToDoList toDos={toDos} />
    </div>
  );
}

export default App;

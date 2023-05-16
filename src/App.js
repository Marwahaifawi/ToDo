import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Forms from "./components/Forms";
import ToDoList from "./components/ToDoList";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    FetchToDos();
  }, []);

  const FetchToDos = async () => {
    try {
      const response = await fetch("http://localhost:3000/toDos"); // Replace with your API endpoint
      const data = await response.json();
      setToDo(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="app-wrapper">
          <div>
            <Header />
          </div>
          <div>
            <Forms
              input={input}
              setInput={setInput}
              toDo={toDo}
              setToDo={setToDo}
            />
          </div>
          <div>
            <ToDoList toDo={toDo} setToDo={setToDo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

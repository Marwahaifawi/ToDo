import React, { useState } from "react";
import Header from "./components/Header";
import Forms from "./components/Forms";
import ToDoList from "./components/ToDoList";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [toDo, setToDo] = useState([]);

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

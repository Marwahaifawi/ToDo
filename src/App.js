import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const App = () => {
  const [input, setInput] = useState("");
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    fetchToDos();
  }, [toDo]);

  const fetchToDos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/toDos`);
      setToDo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createToDo = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/toDos`, {
        title: input,
        description: " Hello",
        completed: false,
      });
      setToDo([...toDo, response.data]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteToDo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/toDos/${todoId}`);
      const filteredToDos = toDo.filter((toDo) => toDo.id !== todoId);
      setToDo(filteredToDos);
    } catch (error) {
      console.error(error);
    }
  };
  // const updateToDo = async (todoId, updatedTodo) => {
  //   try {
  //     await axios.put(`http://localhost:3000/api/toDos/${todoId}`, updatedTodo);
  //     const updatedTodo = toDo.map((todo) => {
  //       if (todo.id === todoId) {
  //         return { ...todo, ...updatedTodo };
  //       }
  //       return todo;
  //     });
  //     setToDo(updatedTodo);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return (
    <>
      <div className="container">
        <div className="app-wrapper">
          <div>
            <Header />
          </div>
          <div>
            <form onSubmit={createToDo}>
              <input
                type="text"
                className="task-input"
                value={input}
                required
                placeholder="Task Title"
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="button-add">Add</button>
            </form>
          </div>
          <div>
            {toDo.map((item) => (
              <li className="list-item" key={item.id}>
                <p>{item.title}</p>

                <button
                  className="button-delete"
                  onClick={() => deleteToDo(item.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

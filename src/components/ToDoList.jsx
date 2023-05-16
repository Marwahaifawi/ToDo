import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ToDoList = ({ toDo, setToDo }) => {
  const complete = async (item) => {
    const updatedToDo = toDo.map((listItem) => {
      if (listItem.id === item.id) {
        return { ...item, completed: !listItem.completed };
      }
      return listItem;
    });

    try {
      const response = await fetch(`http://localhost:3000/toDos/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !item.completed }),
      });

      if (response.ok) {
        setToDo(updatedToDo);
      } else {
        console.log("Error: Failed to update todo item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/toDos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedToDo = toDo.filter((item) => item.id !== id);
        setToDo(updatedToDo);
      } else {
        console.log("Error: Failed to delete todo item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     {toDo.map((item) => (
        <li className="list-item" key={item.id}>
          <input
            type="text"
            value={item.title}
            className={`list ${item.completed ? "complete" : ""}`}
            onClick={() => complete(item)}
            onChange={(event) => event.preventDefault()}
          />
          <select
            value={item.completed}
            onChange={() => complete(item)}
            className="select-completed"
          >
            <option value={false}>Not Completed</option>
            <option value={true}>Completed</option>
          </select>
          <button
            className="button-delete"
            onClick={() => deleteItem(item.id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </li>
      ))}
    </>
  );
};
export default ToDoList;

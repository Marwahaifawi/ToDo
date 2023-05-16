import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ToDoList = ({ toDo, setToDo }) => {
  const complete = (item) => {
    const updatedToDo = toDo.map((listItem) => {
      if (listItem.id === item.id) {
        return { ...item, completed: !listItem.completed };
      }
      return listItem;
    });
    setToDo(updatedToDo);
  };

  const deleteItem = (id) => {
    const updatedToDo = toDo.filter((item) => item.id !== id);
    setToDo(updatedToDo);
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
          <button className="button-delete" onClick={() => deleteItem(item.id)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </li>
      ))}
    </>
  );
};
export default ToDoList;

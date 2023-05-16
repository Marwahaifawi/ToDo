import React from "react";
import { v4 as uuidv4 } from "uuid";

const Forms = ({ input, setInput, toDo, setToDo }) => {
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newToDo = { id: uuidv4(), title: input, completed: false };
    setToDo([...toDo, newToDo]);
    setInput("");
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          className="task-input"
          value={input}
          required
          onChange={onInputChange}
        />
        <button className="button-add">Add</button>
      </form>
    </>
  );
};

export default Forms;

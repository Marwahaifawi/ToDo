import React from "react";
import { v4 as uuidv4 } from "uuid";

const Forms = ({ input, setInput, toDo, setToDo }) => {
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const newToDo = { id: uuidv4(), title: input, completed: false };

    try {
      const response = await fetch("http://localhost:3000/toDos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToDo),
      });

      if (response.ok) {
        const data = await response.json();
        setToDo([...toDo, data]);
        setInput("");
      } else {
        console.log("Error: Failed to add todo item");
      }
    } catch (error) {
      console.log(error);
    }
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

import { useState, useRef } from "react";

const AddToDo = ({ setTodoList, todoList, userId }) => {
  const [description, setDescription] = useState("");
  const todoFormRef = useRef(null);

  async function addTodo(e) {
    e.preventDefault();

    const newTodo = {
      discription: description,
      status_id: 1,
      user_id: userId,
    };

    try {
      const res = await fetch("http://localhost:8080/todolist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo)
      });
      const resNewTodo = await res.json();
      newTodo.ID = resNewTodo.ID;
      newTodo.CreateDate = resNewTodo.CreateDate;

      setTodoList((td) => [...td, newTodo]);
      setDescription("");
      todoFormRef.current.reset();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <form ref={todoFormRef} onSubmit={addTodo}>
        <input
          type="text"
          placeholder="todo"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
};

export default AddToDo;

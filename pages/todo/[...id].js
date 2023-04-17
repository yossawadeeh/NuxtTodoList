const { useRouter } = require("next/router");
import { useState, useRef } from "react";
import Link from "next/link";

const TodoPage = (props) => {
  const [description, setDescription] = useState(props.todoListApi.discription);
  const [status, setStatus] = useState(props.todoListApi.status_id);

  const router = useRouter()

  //console.log(status);

  async function editTodo(e){
    e.preventDefault();
    const editTodo = {
        discription: description,
        status_id: status,
        user_id: parseInt(props.userId),
    }

    try {
        const res = await fetch(`http://localhost:8080/todolist/${props.todoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editTodo)
        });
        const resEditTodo = await res.json();
        router.push('/')
      } catch (e) {
        console.error(e);
      }
    }

  return (
    <>
      <h1>hi todo no. {props.todoId}</h1>
      <br />

      <form>
        <input
          type="text"
          defaultValue={props.todoListApi.discription}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <div>
          <select value={status} onChange={(e) => {setStatus(parseInt(e.target.value))}}>
            {props.statusList.map((status) => {
              return (
                <option key={status.ID} value={status.ID}>
                  {status.status_name}
                </option>
              );
            })}
          </select>
        </div>
        <br/>
        <button onClick={editTodo}>Save</button> 
        <button><Link href="/">Cancel</Link></button>
      </form>
      
    </>
  );
};

export default TodoPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`http://localhost:8080/todolist/${id[0]}/${id[1]}`);
  const todoListApi = await res.json();

  const resStatus = await fetch("http://localhost:8080/status");
  const statusList = await resStatus.json();

  console.log(statusList);
  return {
    props: {
      todoListApi,
      userId: id[0],
      todoId: id[1],
      statusList,
    },
  };
}

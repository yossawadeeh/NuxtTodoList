import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AddToDo from "./AddTodo";
import ToDo from "./Todo";
import { useState } from "react";
import useTodolistApi from "../hooks/useTodolistApi"

const inter = Inter({ subsets: ["latin"] });
const userId = 1

export default function Home({ todoListApi }) {
  const [todoList, setTodoList] = useState(todoListApi);
  //const userId = 1
  //const [todolistApi, get_allTodolist, delete_todolist] = useTodolistApi()

  return (
    <>
      <h1 className="main">My Todo List</h1>
      <AddToDo setTodoList={setTodoList} todoList={todoList} userId={userId}/>

      <div>
        {todoList.map((item) => {
          return (
            <div key={item.ID}>
              <ToDo todoItem={item} todoId={item.ID} setTodoList={setTodoList} userId={userId}/>
              <br/>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:8080/all-todolist/${userId}`);
  const todoListApi = await res.json();

  return {
    props: {
      todoListApi,
    },
  };
}

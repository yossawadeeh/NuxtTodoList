import Link from 'next/link'

const Todo = ({ todoItem, todoId, setTodoList, userId }) => {
    console.log(todoItem)
  async function DeleteTodo(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8080/todolist/${userId}/${todoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const delTodo = await res.json();
      setTodoList((item) => item.filter((i) => i.ID !== todoId));
    } catch (e) {
      window.alert(e);
    }
  }

  return (
    <>
      <div>
        {" "}
        No. {todoItem.ID}; Discription: {todoItem.discription}; Status:{" "}
        {todoItem.status_id}; CreateDate:{todoItem.CreateDate}
        <button><Link href={`/todo/${userId}/${todoId}`}>Edit</Link></button>
        <button onClick={DeleteTodo}>Delete</button>
      </div>
    </>
  );
};

export default Todo;

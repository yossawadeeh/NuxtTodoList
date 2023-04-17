const { useCallback } = require("react")
import todolistApi from "../pages/api/todolist"

const useTodolistApi = () => {
    const [todolist, setTodolist] = useState([])

    const get_allTodolist = useCallback(
        async (userid) => {
            const result = await todolistApi.getAllTodoList(userid)
            setTodolist(result.data)
        }, [setTodolist]
    )

    const delete_todolist = useCallback(
        async (userid, todoId) => {
            try{
                const result = await todolistApi.deleteTodoList(userid, todoId)
                setTodolist((item) => item.filter((i) => i.ID !== todoId))
            }catch(e){
                window.alert(err)
            }

        }, [setTodolist]
    )

    return [todolist, get_allTodolist, delete_todolist] 
}
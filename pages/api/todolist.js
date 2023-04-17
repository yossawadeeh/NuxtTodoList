const API_URL = process.env.REACT_APP_API_URL

const todolistApi = {
    getAllTodoList: (userid) => {
        return axios.get(`${API_URL}all-todolist/${userid}`)
    },
    deleteTodoList: (userid, todoId) => {
        return axios.get(`${API_URL}todolist/${userid}/${todoId}`)
    }
}

export default todolistApi
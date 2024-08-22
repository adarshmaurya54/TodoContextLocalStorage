
import beams from "./images/beams.jpg"
import TodoForm from "./component/TodoForm";
import Todo from "./component/Todo";
import { TodoProvider } from "./contexts";
import { useEffect, useState } from "react";



function App() {
  const [todos, setTodos] = useState([]);

  const updateTodo = (id, todo) => {
    setTodos((prevTodos) => prevTodos.map((prevTodo) => (prevTodo.id === id) ? todo : prevTodo))
  }
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => (prevTodo.id != id)))
  }
  const toggleComplete = (id) => {
    setTodos((prevTodos) => prevTodos.map((prevTodo) => (prevTodo.id === id) ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  useEffect(() => {
    const todosJson = localStorage.getItem("todos");

    // Check if 'todosJson' is null or empty
    if (todosJson) {
      const storedTodos = JSON.parse(localStorage.getItem("todos"))
      if (storedTodos && storedTodos.length > 0) {
        setTodos(storedTodos);
      }
    }

  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <TodoProvider value={{ todos, updateTodo, deleteTodo, addTodo, toggleComplete }}>
      <div style={{ backgroundImage: `url(${beams})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} className="h-[100vh] md:py-0 py-10 flex justify-center relative">
        <div className="md:h-[85%] h-[100%] md:w-[600px] w-[370px]  rounded-xl md:p-5">
          <h1 className="text-4xl  pb-10 text-center font-bold">Manage Your Todos</h1>
          {/* form compontent */}
          <TodoForm />
          {/* todo lists component */}
          <div className="flex flex-col h-[80%] overflow-auto rounded-xl gap-3">
            {todos.map((todo) => (<Todo todo={todo} key={todo.id} />))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

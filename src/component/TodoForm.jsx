import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {

  const [todo, setTodo] = useState("");// state for individual todo

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();// preventing default behaviour of the form
    if(todo == "") return;
    addTodo({ todo, completed: false });
    setTodo(""); //cleaning corrent todo content
  }

  return (
    <form onSubmit={add} className="mb-10 flex md:flex-row flex-col md:gap-0 gap-3 items-center justify-between">
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className="focus:outline-2 focus:outline-black outline-offset-2 border md:w-[75%] w-full text-lg font-light rounded-xl outline-none py-2 px-4" placeholder="Write Todo..." />
      <button className="border px-6 py-2 rounded-xl bg-black md:w-auto w-full transition-all text-white text-lg">+ Add</button>
    </form>
  )
}

export default TodoForm

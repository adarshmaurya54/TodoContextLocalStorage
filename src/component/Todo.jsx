import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useTodo } from '../contexts';

function Todo(props) {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [todoMsg, setTodoMsg] = useState(props.todo.todo)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo();
    const handleEdit = () => {
        setIsReadOnly(false)
    }
    const handleSave = () => {
        setIsReadOnly(true)
        updateTodo(props.todo.id, {...props.todo, todo: todoMsg})
    }
    const toggleCompleted = () => {
        toggleComplete(props.todo.id)
    }

    return (
        <div className="border bg-white rounded-xl py-3 flex md:flex-row flex-col items-center justify-between">
            <div class="inline-flex md:mb-0 mb-3 md:w-[60%] w-full items-center">
                <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={`check${props.todo.id}`}>
                    <input type="checkbox"
                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id={`check${props.todo.id}`}
                        checked={props.todo.completed}
                        onChange={toggleCompleted} />
                    <span
                        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <label class="mt-px font-light text-gray-700 cursor-pointer select-none w-full md:pl-0 pr-3" htmlFor={`check${props.todo.id}`}>
                    <input readOnly={isReadOnly} type="text" value={todoMsg} onChange={(e) => setTodoMsg(e.target.value)} className={`w-full ${props.todo.completed && "line-through"} outline-none py-2 px-1 rounded-xl`} />
                </label>
            </div>
            <div className="flex md:w-auto w-full md:px-0 px-3">
                {
                isReadOnly ? 
                (<button onClick={handleEdit} type="button" class="text-white justify-center md:w-auto w-[50%] flex gap-1 items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm transition-all px-5 py-2.5 me-2">
                    <CiEdit className="inline" />
                    <span>Edit</span>
                </button>)
                : 
                (<button onClick={handleSave} type="button" class="text-white justify-center md:w-auto w-[50%] flex gap-1 items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm transition-all px-5 py-2.5 me-2">
                    <CiEdit className="inline" />
                    <span>Save</span>
                </button>)
                }
                <button onClick={() => deleteTodo(props.todo.id)} type="button" class="flex justify-center items-center md:w-auto w-[50%] gap-1 text-white bg-[#DC4C64] hover:bg-[#df2c49] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm transition-all px-5 py-2.5 me-2">
                    <FaTrash className="inline" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}

export default Todo

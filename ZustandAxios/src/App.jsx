// import React from 'react'
// import AddTodoForm from './component/addTodoForm'
// import TodoList from './component/todoList'
// const App = () => {
//   return (
//     <div>
//       <h1>Todo list</h1>
//       <AddTodoForm/>
//       <TodoList/>
//     </div>
//   )
// }

// export default App
import React, { useState } from "react";
import useTodoStore from "./store/todoStore";
import TodoItem from "./component/todoItem";

const App = () => {
    const { todos, addTodo } = useTodoStore();
    const [input, setInput] = useState("");

    const handleAddTodo = () => {
        if (input.trim() !== "") {
            addTodo(input);
            setInput("");
        }
    };

    return (
        <div>
            <h1>Todo App (Zustand)</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a todo..."
            />
            <button onClick={handleAddTodo}>Add Todo</button>

            <div>
                {todos.length === 0 ? <p>No todos available.</p> : 
                    todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
            </div>
        </div>
    );
};

export default App;

import React from "react";
import useTodoStore from "../store/todoStore";

const TodoItem = ({ todo }) => {
    const { removeTodo, toggleTodo } = useTodoStore();

    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
    );
};

export default TodoItem;

// src/TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: '買い物' },
        { id: 2, text: '散歩' },
        { id: 3, text: '洗濯' },
    ]);

    return ( <
        div className = "todo-list" >
        <
        h1 > Todo List < /h1> <
        ul > {
            todos.map(todo => ( <
                li key = { todo.id } > { todo.text } < /li>
            ))
        } <
        /ul> < /
        div >
    );
};

export default TodoList;
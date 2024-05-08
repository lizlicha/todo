// src/TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            user_id: 1,
            user_name: 'アリス',
            text: '買い物',
            description: '牛乳、パン、卵、チーズを買う',
            tag1: 'ショッピング',
            tag2: '緊急',
            tag3: null,
            completed: false,
        },
        {
            id: 2,
            user_id: 2,
            user_name: 'ボブ',
            text: '犬の散歩',
            description: '公園で犬を散歩させる',
            tag1: '運動',
            tag2: 'ペット',
            tag3: null,
            completed: false,
        },
        {
            id: 3,
            user_id: 1,
            user_name: 'アリス',
            text: '洗濯',
            description: '服を洗って畳む',
            tag1: '家事',
            tag2: null,
            tag3: null,
            completed: false,
        },
    ]);

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <h2>{todo.text}</h2>
                        <p><strong>ユーザー:</strong> {todo.user_name}</p>
                        <p><strong>詳細:</strong> {todo.description}</p>
                        <p><strong>タグ:</strong> {todo.tag1}, {todo.tag2}, {todo.tag3}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

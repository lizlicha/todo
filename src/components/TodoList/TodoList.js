import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const handleComplete = (id) => {
        fetch(`https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, completed: true })
        })
        .then(response => {
            if (response.ok) {
                setTodos(todos.filter(todo => todo.id !== id));
            } else {
                console.error('Failed to update todo');
            }
        })
        .catch(error => console.error('Error updating todo:', error));
    };

    const handleReset = () => {
        const ids = [1, 2, 3];
        const resetPromises = ids.map(id =>
            fetch(`https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, completed: false })
            })
        );

        Promise.all(resetPromises)
            .then(responses => {
                if (responses.every(response => response.ok)) {
                    fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos')
                        .then(response => response.json())
                        .then(data => setTodos(data))
                        .catch(error => console.error('Error fetching todos:', error));
                } else {
                    console.error('Failed to reset todos');
                }
            })
            .catch(error => console.error('Error resetting todos:', error));
    };

    const formatTags = (tag1, tag2, tag3) => {
        const tags = [tag1, tag2, tag3].filter(tag => tag).map(tag => `#${tag}`);
        return tags.join(' ');
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <button onClick={handleReset}>テストデータ復活(デバッグ用)</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p><strong>ユーザー:</strong> {todo.user_name}</p>
                        <p><strong>詳細:</strong> {todo.description}</p>
                        <p><strong>タグ:</strong> {formatTags(todo.tag1, todo.tag2, todo.tag3)}</p>
                        <button onClick={() => handleComplete(todo.id)}>完了</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

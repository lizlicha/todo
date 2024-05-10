import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        user_name: '',
        title: '',
        description: '',
        tag1: '',
        tag2: '',
        tag3: '',
        completed: false,
    });

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(response => response.json())
        .then(data => {
            setTodos([...todos, data]);
            setNewTodo({
                user_name: '',
                title: '',
                description: '',
                tag1: '',
                tag2: '',
                tag3: '',
                completed: false,
            });
        })
        .catch(error => console.error('Error adding todo:', error));
    };

    const formatTags = (tag1, tag2, tag3) => {
        const tags = [tag1, tag2, tag3].filter(tag => tag).map(tag => `#${tag}`);
        return tags.join(' ');
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <button onClick={handleReset}>テストデータ復活(デバッグ用)</button>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    name="user_name"
                    placeholder="ユーザー名"
                    value={newTodo.user_name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="タイトル"
                    value={newTodo.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="詳細"
                    value={newTodo.description}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="tag1"
                    placeholder="タグ1"
                    value={newTodo.tag1}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="tag2"
                    placeholder="タグ2"
                    value={newTodo.tag2}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="tag3"
                    placeholder="タグ3"
                    value={newTodo.tag3}
                    onChange={handleInputChange}
                />
                <button type="submit">追加</button>
            </form>
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

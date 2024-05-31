import React, { useState, useEffect } from 'react';
import './TodoList.css';
import AddTodo from '../AddTodo/AddTodo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [sortType, setSortType] = useState('title');

    useEffect(() => {
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos')
            .then(response => response.json())
            .then(data => {
                sortTodos(data);
            })
            .catch(error => console.error('Error fetching todos:', error));
    }, [sortType]);

    const sortTodos = (todos) => {
        todos.sort((a, b) => {
            if (sortType === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortType === 'date') {
                return new Date(a.date) - new Date(b.date);
            }
        });
        setTodos(todos);
    };

    const handleComplete = (id) => {
        setTodos(todos.map(todo => (
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )));
    };

    const handleReset = () => {
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos')
            .then(response => response.json())
            .then(data => {
                sortTodos(data);
            })
            .catch(error => console.error('Error fetching todos:', error));
    };

    const handleAddTodo = (newTodo) => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        sortTodos(updatedTodos);
    };

    const formatTags = (tag1, tag2, tag3) => {
        return [tag1, tag2, tag3].filter(tag => tag).join(', ');
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <select className="sort-select" onChange={(e) => setSortType(e.target.value)}>
                <option value="title">タイトルでソート</option>
                <option value="date">日付でソート</option>
            </select>
            <AddTodo onAddTodo={handleAddTodo} />
            <button onClick={handleReset}>テストデータ復活(デバッグ用)</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <h2>{todo.title}</h2>
                        <p><strong>ユーザー:</strong> {todo.user_name}</p>
                        <p><strong>詳細:</strong> {todo.description}</p>
                        <p><strong>タグ:</strong> {formatTags(todo.tag1, todo.tag2, todo.tag3)}</p>
                        <p><strong>日付:</strong> {todo.date}</p>
                        <button onClick={() => handleComplete(todo.id)}>
                            {todo.completed ? '未完了' : '完了'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

import React, { useState, useEffect } from 'react';
import './TodoList.css';
import AddTodo from '../AddTodo/AddTodo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [sortType, setSortType] = useState('title'); // ソートタイプのデフォルトをタイトルに設定

    useEffect(() => {
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos')
            .then(response => response.json())
            .then(data => {
                sortTodos(data); // データを取得後にソート
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
        // 既存のコードをそのまま使用
    };

    const handleReset = () => {
        // 既存のコードをそのまま使用
    };

    const handleAddTodo = (newTodo) => {
        setTodos([...todos, newTodo]); // 新しいTodoを追加後、自動的にソート
        sortTodos([...todos, newTodo]);
    };

    const formatTags = (tag1, tag2, tag3) => {
        // 既存のコードをそのまま使用
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="title">タイトルでソート</option>
                <option value="date">日付でソート</option>
            </select>
            <button onClick={handleReset}>テストデータ復活(デバッグ用)</button>
            <AddTodo onAddTodo={handleAddTodo} />
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

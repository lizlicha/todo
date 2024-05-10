import React, { useState, useEffect } from 'react';
import './TodoList.css';
import AddTodo from '../AddTodo/AddTodo';

// TodoListコンポーネントの定義
const TodoList = () => {
    // Todoリストの状態を管理するためのステートを定義
    const [todos, setTodos] = useState([]);

    // コンポーネントのマウント時にAPIからTodoリストを取得する
    useEffect(() => {
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    // Todo項目を完了状態に更新する関数
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
                // 更新が成功した場合、完了した項目をリストから削除する
                setTodos(todos.filter(todo => todo.id !== id));
            } else {
                console.error('Failed to update todo');
            }
        })
        .catch(error => console.error('Error updating todo:', error));
    };

    // デバッグ用に特定のTodo項目をリセットする関数
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

        // すべてのリクエストが完了した後に再度Todoリストを取得する
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

    // 新しいTodoが追加されたときに呼び出される関数
    const handleAddTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    // タグをフォーマットする関数
    const formatTags = (tag1, tag2, tag3) => {
        const tags = [tag1, tag2, tag3].filter(tag => tag).map(tag => `#${tag}`);
        return tags.join(' ');
    };

    // コンポーネントのレンダリング
    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <button onClick={handleReset}>テストデータ復活(デバッグ用)</button>
            {/* AddTodoコンポーネントの呼び出し */}
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

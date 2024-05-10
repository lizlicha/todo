// AddTodo.js
import React, { useState } from 'react';
import './AddTodo.css';

// Enterキーが押されたときにフォームが送信されないようにする関数
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};

const AddTodo = ({ onAddTodo }) => {
    // フォームの入力データを管理するステートを定義
    const [newTodo, setNewTodo] = useState({
        user_name: '',
        title: '',
        description: '',
        tag1: '',
        tag2: '',
        tag3: '',
        completed: false,
    });

    // 入力フィールドの値が変更されたときに呼び出される関数
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    // フォームが送信されたときに呼び出される関数
    const handleAddTodo = (event) => {
        event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

        // 新しいTodo項目をAPIに送信する関数
        fetch('https://56n12ow66c.execute-api.ap-northeast-1.amazonaws.com/Prod/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Todo added:', data); // 成功した場合のログ
            onAddTodo(newTodo); // 親コンポーネントに新しいTodoを追加する
        })
        .catch(error => console.error('Error adding todo:', error));

        // フォームをリセットする
        setNewTodo({
            user_name: '',
            title: '',
            description: '',
            tag1: '',
            tag2: '',
            tag3: '',
            completed: false,
        });
    };

    // フォームのレンダリング
    return (
        <form onSubmit={handleAddTodo}>
            <input
                type="text"
                name="user_name"
                placeholder="ユーザー名"
                value={newTodo.user_name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Enterキーが押されたときの動作を制御
            />
            <input
                type="text"
                name="title"
                placeholder="タイトル"
                value={newTodo.title}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Enterキーが押されたときの動作を制御
            />
            <input
                type="text"
                name="description"
                placeholder="詳細"
                value={newTodo.description}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Enterキーが押されたときの動作を制御
            />
            <input
                type="text"
                name="tag1"
                placeholder="タグ1"
                value={newTodo.tag1}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Enterキーが押されたときの動作を制御
            />
            <input
                type="text"
                name="tag2"
                placeholder="タグ2"
                value={newTodo.tag2}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Enterキーが押されたときの動作を制御
            />
            <input
                type="text"
                name="tag3"
                placeholder="タグ3"
                value={newTodo.tag3}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Enterキーが押されたときの動作を制御
            />
            <button type="submit">追加</button>
        </form>
    );
};

export default AddTodo;

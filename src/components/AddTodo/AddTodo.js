import React, { useState } from 'react';
import './AddTodo.css';

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Enterキーでのフォーム送信を防止
    }
};

const AddTodo = ({ onAddTodo }) => {
    const [newTodo, setNewTodo] = useState({
        user_name: '',
        title: '',
        description: '',
        tag1: '',
        tag2: '',
        tag3: '',
        date: '',  // 日付のステート
        time: '',  // 時間のステート
        completed: false,
    });

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
            onAddTodo(newTodo);
        })
        .catch(error => console.error('Error adding todo:', error));
        setNewTodo({
            user_name: '',
            title: '',
            description: '',
            tag1: '',
            tag2: '',
            tag3: '',
            date: '',
            time: '',
            completed: false,
        });
    };

    return (
        <form onSubmit={handleAddTodo}>
            <input type="text" name="user_name" placeholder="ユーザー名" value={newTodo.user_name} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <input type="text" name="title" placeholder="タイトル" value={newTodo.title} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <div className="datetime-container">
                <input type="date" name="date" placeholder="期限" value={newTodo.date} onChange={handleInputChange} className="datetime-input" />
                <input type="time" name="time" value={newTodo.time} onChange={handleInputChange} className="datetime-input" />
            </div>
            <input type="text" name="description" placeholder="詳細" value={newTodo.description} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <div className="tag-container">
                <input type="text" name="tag1" placeholder="タグ1" value={newTodo.tag1} onChange={handleInputChange} onKeyDown={handleKeyDown} className="tag-input" />
                <input type="text" name="tag2" placeholder="タグ2" value={newTodo.tag2} onChange={handleInputChange} onKeyDown={handleKeyDown} className="tag-input" />
                <input type="text" name="tag3" placeholder="タグ3" value={newTodo.tag3} onChange={handleInputChange} onKeyDown={handleKeyDown} className="tag-input" />
            </div>
            <button type="submit">追加</button>
        </form>
    );
};

export default AddTodo;

// src/AddTodo.js
import React, { useState } from 'react';
import './AddTodo.css';

const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};

const AddTodo = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState({
        user_name: '',
        title: '',
        description: '',
        tag1: '',
        tag2: '',
        tag3: '',
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
        addTodo(newTodo);
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

    return (
        <form onSubmit={handleAddTodo}>
        <input
            type="text"
            name="user_name"
            placeholder="ユーザー名"
            value={newTodo.user_name}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        <input
            type="text"
            name="title"
            placeholder="タイトル"
            value={newTodo.title}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        <input
            type="text"
            name="description"
            placeholder="詳細"
            value={newTodo.description}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        <input
            type="text"
            name="tag1"
            placeholder="タグ1"
            value={newTodo.tag1}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        <input
            type="text"
            name="tag2"
            placeholder="タグ2"
            value={newTodo.tag2}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        <input
            type="text"
            name="tag3"
            placeholder="タグ3"
            value={newTodo.tag3}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        <button type="submit">追加</button>
    </form>

    );
};

export default AddTodo;

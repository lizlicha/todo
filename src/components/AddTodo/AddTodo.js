import React, { useState } from 'react';
import './AddTodo.css';

const AddTodo = ({ onAddTodo }) => {
    const [newTodo, setNewTodo] = useState({
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
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        if (!newTodo.user_name) tempErrors.user_name = "ユーザー名は必須です";
        if (!newTodo.title) tempErrors.title = "タイトルは必須です";
        if (!newTodo.date) tempErrors.date = "日付は必須です";
        if (!newTodo.time) tempErrors.time = "時間は必須です";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
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
        if (!validateForm()) return;
        onAddTodo(newTodo);
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
            <input type="text" name="user_name" aria-label="ユーザー名" placeholder="ユーザー名" value={newTodo.user_name} onChange={handleInputChange} />
            {errors.user_name && <p className="error">{errors.user_name}</p>}
            <input type="text" name="title" aria-label="タイトル" placeholder="タイトル" value={newTodo.title} onChange={handleInputChange} />
            {errors.title && <p className="error">{errors.title}</p>}
            <input type="text" name="description" aria-label="詳細" placeholder="詳細" value={newTodo.description} onChange={handleInputChange} />
            <div className="datetime-container">
                <input type="date" name="date" aria-label="日付" value={newTodo.date} onChange={handleInputChange} />
                {errors.date && <p className="error">{errors.date}</p>}
                <input type="time" name="time" aria-label="時間" value={newTodo.time} onChange={handleInputChange} />
                {errors.time && <p className="error">{errors.time}</p>}
            </div>
            <div className="tag-container">
                <input type="text" name="tag1" aria-label="タグ1" placeholder="タグ1" value={newTodo.tag1} onChange={handleInputChange} />
                <input type="text" name="tag2" aria-label="タグ2" placeholder="タグ2" value={newTodo.tag2} onChange={handleInputChange} />
                <input type="text" name="tag3" aria-label="タグ3" placeholder="タグ3" value={newTodo.tag3} onChange={handleInputChange} />
            </div>
            <button type="submit">追加</button>
        </form>
    );
};

export default AddTodo;

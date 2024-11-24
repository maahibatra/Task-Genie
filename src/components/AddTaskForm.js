import React, { useState } from 'react';
import nlp from 'compromise';

const AddTaskForm = ({ addTask, handleAIClick }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskTitle) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            completed: false,
        };
        addTask(newTask);

        setTaskTitle('');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={taskTitle} 
                    onChange={(e) => setTaskTitle(e.target.value)} 
                    placeholder="Task..."
                    required
                    className='taskAdd'
                    maxLength={25}
                />
                <button type="submit" className='addButton'>Add+</button>
            </form>
            <button onClick={handleAIClick} className="aiButton">✨</button>
        </div>
    );
};

export default AddTaskForm;

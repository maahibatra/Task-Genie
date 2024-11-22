import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
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
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="Task..."
                required
                className='taskAdd'
            />
            <button type="submit" className='addButton'>Add+</button>
        </form>
    );
};

export default AddTaskForm;

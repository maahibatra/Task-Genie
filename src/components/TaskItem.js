import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, toggleComplete, updateTaskTitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const saveEdit = () => {
        updateTaskTitle(task.id, editedTitle);
        setIsEditing(false);
    };

    return (
        <div 
            className={`taskItem ${task.completed ? 'completed' : ''}`} 
            onClick={() => toggleComplete(task.id)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            {isEditing ? (
                <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)} 
                    onClick={(e) => e.stopPropagation()}
                    className="editInput"
                />
            ) : (
                <span className="taskTitle">{task.title}</span>
            )}

            <div className="buttonContainer" style={{ display: 'flex', gap: '10px' }}>
                {isEditing ? (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            saveEdit();
                        }} 
                        className="saveButton"
                    >
                        Save
                    </button>
                ) : (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true);
                        }} 
                        className="editButton"
                    >
                        Edit
                    </button>
                )}

                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                    }} 
                    className="deleteButton"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;

import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, toggleComplete, updateTaskTitle, isPreview }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const saveEdit = () => {
        updateTaskTitle(task.id, editedTitle);
        setIsEditing(false);
    };

    return (
        <div 
            className={`taskItem ${task.completed ? 'completed' : ''}`} 
            onClick={!isPreview ? () => toggleComplete(task.id) : undefined}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            {isEditing && !isPreview ? (
                <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)} 
                    onClick={(e) => e.stopPropagation()}
                    className="editInput"
                    maxLength={25}
                />
            ) : (
                <span className="taskTitle">{task.title}</span>
            )}

            {!isPreview && (
                <div className="buttonContainer">
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
            )}
        </div>
    );
};

export default TaskItem;

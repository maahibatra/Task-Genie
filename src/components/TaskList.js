import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, toggleComplete, updateTaskTitle }) => {
    return (
        <ul className="taskList">
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask} 
                    toggleComplete={toggleComplete} 
                    updateTaskTitle={updateTaskTitle}
                />
            ))}
        </ul>
    );
};

export default TaskList;

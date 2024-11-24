import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem'; // Import TaskItem

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [showAIPrompt, setShowAIPrompt] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [aiGeneratedTasks, setAiGeneratedTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState(''); // Define taskTitle here
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    const addTask = (task) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const toggleComplete = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const updateTaskTitle = (taskId, newTitle) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, title: newTitle } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleAIClick = () => {
        setShowAIPrompt(true);
    };

    const handleAISubmit = async () => {
        if (!aiResponse.trim()) {
            setError('Please enter a description for the tasks.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const refinedPrompt = `Generate a task list for the following items: ${aiResponse}. Please output only the tasks, one per line, without any additional commentary or suggestions.`;

            const response = await axios.post('http://localhost:5000/api/generate-tasks', { prompt: refinedPrompt });
            console.log(response.data);
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                const rawText = response.data[0].generated_text;

                const cleanedText = rawText
                    .split('\n')
                    .map(taskText => taskText.trim())
                    .filter(taskText => taskText.length > 0);

                const taskTitles = cleanedText.filter(taskText => {
                    return taskText.match(/^[a-zA-Z\s,]+$/);
                });

                const tasksWithIds = taskTitles.map((taskText) => ({
                    id: Date.now() + Math.random(),
                    title: taskText,
                    completed: false
                }));

                setAiGeneratedTasks(tasksWithIds);
            } else {
                setError('No tasks generated');
            }
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError(err.response ? err.response.data.error : 'An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAIGeneratedTasks = () => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, ...aiGeneratedTasks];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });

        setAiGeneratedTasks([]);
        // Close the AI prompt modal and clear the response
        setShowAIPrompt(false);
        setAiResponse('');
    };

    const handleCancelAIPrompt = () => {
        setAiGeneratedTasks([]);
        setShowAIPrompt(false);
        setAiResponse('');
    };

    // Function to add tasks directly to the preview modal list (aiGeneratedTasks)
    const handleAddTaskToPreviewModal = () => {
        if (!taskTitle.trim()) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            completed: false,
        };
        
        setAiGeneratedTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskTitle('');
    };

    return (
        <div className="app">
            <div className="header">
                Task Genie
                <span className='subHeader'>(Beta)</span>
            </div>
            <AddTaskForm addTask={addTask} handleAIClick={handleAIClick} />
            <TaskList 
                tasks={tasks} 
                deleteTask={deleteTask} 
                toggleComplete={toggleComplete} 
                updateTaskTitle={updateTaskTitle}
            />
            
            {showAIPrompt && (
                <div className="promptModal">
                    <div className='modalHeader'>What's going on today?</div>
                    <textarea
                        placeholder="Describe your tasks..."
                        value={aiResponse}
                        onChange={(e) => setAiResponse(e.target.value)}
                        className='promptText'
                    ></textarea>
                    <button onClick={handleAISubmit} disabled={loading} className='modalButton'>
                        {loading ? 'Loading...' : 'Send'}
                    </button>
                    <button onClick={handleCancelAIPrompt} className='modalButton'>Cancel</button>
                </div>
            )}

            {aiGeneratedTasks.length > 0 && (
                <div className="previewModal">
                    <div className='modalHeader'>Generated Task List</div>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="New task..."
                        className="taskAdd"
                    />
                    <button onClick={handleAddTaskToPreviewModal} className='modalButton'>Add</button>
                    <div className="taskList">
                        {aiGeneratedTasks.map((task) => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                deleteTask={(taskId) => setAiGeneratedTasks(aiGeneratedTasks.filter(task => task.id !== taskId))} 
                                updateTaskTitle={(taskId, newTitle) => {
                                    setAiGeneratedTasks(aiGeneratedTasks.map(task => 
                                        task.id === taskId ? { ...task, title: newTitle } : task
                                    ));
                                }} 
                                toggleComplete={toggleComplete}
                            />
                        ))}
                    </div>
                    <button onClick={handleSaveAIGeneratedTasks} className='modalButton'>Save to Tasks</button>
                    <button onClick={handleCancelAIPrompt} className='modalButton'>Cancel</button>
                </div>
            )}

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default App;

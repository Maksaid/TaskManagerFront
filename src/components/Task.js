import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' },
    ]);
    const [showForm, setShowForm] = useState(false);

    const handleAddTask = () => {
        setShowForm(true);
    };

    return (
        <div>
            <h1 className="m-4">Task Page</h1>
            <button onClick={handleAddTask}>Add Task</button>
            {showForm && <CreateTaskForm />}
            <div className="flex-column m-lg-2 m-4 d-flex">
                {tasks.map(task => (
                    <div className="flex-row border-black d-flex m-2 border rounded-1 p-2" key={task.id}>
                        <Link className="text-black text-decoration-none" to={`/task/${task.id}`}>{task.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CreateTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task created:', { title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Task</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Create Task</button>
        </form>
    );
};

export default Task;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' },
    ]);

    return (
        <div>
            <h1>Task Page</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;


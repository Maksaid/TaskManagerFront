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
            <h1 className="m-4">Task Page</h1>
            <div className="flex-column m-lg-2 m-4 d-flex">
                {tasks.map(task => (
                    <div className="flex-row border-black d-flex m-2 border rounded-1 p-2" key={task.id}>
                        <Link className="text-black text-decoration-none" to={`/tasks/${task.id}`}>{task.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;


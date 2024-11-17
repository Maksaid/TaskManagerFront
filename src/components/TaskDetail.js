import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { taskId } = useParams();
    const tasks = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    ];

    const task = tasks.find(t => t.id === parseInt(taskId));

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            {"task about something new"}
        </div>
    );
};

export default TaskDetail;

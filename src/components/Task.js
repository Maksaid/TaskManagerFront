import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', assignedTo: 'User1', createdBy: 'User2', project: 'Project1' },
        { id: 2, title: 'Task 2', assignedTo: 'User2', createdBy: 'User1', project: 'Project2' },
        { id: 3, title: 'Task 3', assignedTo: 'User1', createdBy: 'User1', project: 'Project1' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState('all');

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.id.toString().includes(searchTerm) || task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'assignedToMe' && task.assignedTo === 'User1') || (filter === 'createdByMe' && task.createdBy === 'User1');
        const matchesProjectFilter = projectFilter === 'all' || task.project === projectFilter;
        return matchesSearch && matchesFilter && matchesProjectFilter;
    });

    return (
        <div>
            <h1 className="m-4">Task Page</h1>
            <Link className="m-4 btn btn-primary" to="/create-task">Add Task</Link>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="m-4"
                style={{ width: '400px' }}
            />
            <div>
                <button onClick={() => setFilter('all')} className="btn btn-secondary m-2">All Tasks</button>
                <button onClick={() => setFilter('assignedToMe')} className="btn btn-secondary m-2">Assigned to Me</button>
                <button onClick={() => setFilter('createdByMe')} className="btn btn-secondary m-2">Created by Me</button>
                <button onClick={() => setProjectFilter('all')} className="btn btn-secondary m-2">All Projects</button>
                <button onClick={() => setProjectFilter('Project1')} className="btn btn-secondary m-2">Project 1</button>
                <button onClick={() => setProjectFilter('Project2')} className="btn btn-secondary m-2">Project 2</button>
            </div>
            <div className="flex-column m-lg-2 m-4 d-flex">
                {filteredTasks.map(task => (
                    <div className="flex-row border-black d-flex m-2 border rounded-1 p-2" key={task.id}>
                        <Link className="text-black text-decoration-none" to={`/task/${task.id}`}>{task.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;

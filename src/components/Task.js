// src/components/Task.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Task = () => {
    const { project_id } = useParams();
    let projects = JSON.parse(localStorage.getItem("projects"));
    if (projects === null)
        projects = [{ name: "proj1" }, { name: "proj2" }];
    const current_user = localStorage.getItem("user_id");
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', assignedTo: 'User1', createdBy: 'User2', projectName: 'Project1' },
        { id: 2, title: 'Task 2', assignedTo: 'User2', createdBy: 'User1', projectName: 'Project2' },
        { id: 3, title: 'Task 3', assignedTo: 'User1', createdBy: 'User1', projectName: 'Project1' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState(project_id || 'all');

    useEffect(() => {
        if (project_id) {
            setProjectFilter(project_id);
        }
    }, [project_id]);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.id.toString().includes(searchTerm) || task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'assignedToMe' && task.assignedTo === current_user) || (filter === 'createdByMe' && task.createdBy === current_user);
        const matchesProjectFilter = projectFilter === 'all' || task.projectName === projectFilter;
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
                <button onClick={() => setFilter('all')} className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'} m-2`}>All Tasks</button>
                <button onClick={() => setFilter('assignedToMe')} className={`btn ${filter === 'assignedToMe' ? 'btn-primary' : 'btn-secondary'} m-2`}>Assigned to Me</button>
                <button onClick={() => setFilter('createdByMe')} className={`btn ${filter === 'createdByMe' ? 'btn-primary' : 'btn-secondary'} m-2`}>Created by Me</button>
                <button onClick={() => setProjectFilter('all')} className={`btn ${projectFilter === 'all' ? 'btn-primary' : 'btn-secondary'} m-2`}>All Projects</button>
                {projects.map((project, index) => (
                    <button
                        key={index}
                        onClick={() => setProjectFilter(project.name)}
                        className={`btn ${projectFilter === project.name ? 'btn-primary' : 'btn-secondary'} m-2`}
                    >
                        {project.name}
                    </button>
                ))}
            </div>
            <div className="flex-column m-lg-2 m-4 d-flex">
                {filteredTasks.map(task => (
                    <div className="flex-row border-black d-flex m-2 border rounded-1 p-2" key={task.id}>
                        <Link className="text-black text-decoration-none d-flex justify-content-start w-100 flex-row" to={`/task/${task.id}`}>
                            <div className="m-3">{task.title}</div>
                            <div className="m-3">{task.projectName}</div>
                            <div className="m-3">Assigned to {task.assignedTo}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;

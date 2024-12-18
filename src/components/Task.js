// src/components/Task.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Task.css'

const Task = () => {
    const { project_id } = useParams();
    let org_id = localStorage.getItem("org_id");

    const current_user = localStorage.getItem("user_id");
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState(project_id || 'all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/' + org_id);
                setProjects(response.data.projects);
                setLoading(false);
            } catch (err) {
                //setError(err);
                setLoading(false);
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/Tasks', {
                    params: { organization: org_id } // Add the organization as a query parameter
                });
                setTasks(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchTasks();
        fetchProjects();
    }, []);

    useEffect(() => {
        if (project_id !== 'none') {
            setProjectFilter(project_id);
        }else
            setProjectFilter('all');

    }, [project_id]);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.id.toString().includes(searchTerm) || task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'assignedToMe' && task.assignedTo === current_user) || (filter === 'createdByMe' && task.createdBy === current_user);
        const matchesProjectFilter = projectFilter === 'all' || task.projectId === projectFilter;
        return matchesSearch && matchesFilter && matchesProjectFilter;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
            <div className="d-flex justify-content-between">
                <div>
                    <button onClick={() => setFilter('all')} className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'} m-2`}>All Tasks</button>
                    <button onClick={() => setFilter('assignedToMe')} className={`btn ${filter === 'assignedToMe' ? 'btn-primary' : 'btn-secondary'} m-2`}>Assigned to Me</button>
                    <button onClick={() => setFilter('createdByMe')} className={`btn ${filter === 'createdByMe' ? 'btn-primary' : 'btn-secondary'} m-2`}>Created by Me</button>
                </div>
                <div>
                    <button onClick={() => setProjectFilter('all')}
                            className={`btn ${projectFilter === 'all' ? 'btn-primary' : 'btn-secondary'} m-2`}>All
                        Projects
                    </button>
                    {projects.map((project, index) => (
                        <button
                            key={index}
                            onClick={() => setProjectFilter(project.id)}
                            className={`btn ${projectFilter == project.id ? 'btn-primary' : 'btn-secondary'} m-2`}
                        >
                            {project.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="task-table">
                <div className="task-row task-header">
                    <div className="task-column-cell">Title</div>
                    <div className="task-column-cell">Project</div>
                    <div className="task-column-cell">Assignee</div>
                    <div className="task-column-cell">Status</div>
                </div>
                {filteredTasks.map(task => (
                    <div className="task-row" key={task.id}>
                        <Link className="task-link" to={`/task/${task.id}`}>
                            <div className="task-cell rounded-start-2 task-cell-side-left">{task.title}</div>
                            <div className="task-cell">{task.projectName}</div>
                            <div className="task-cell">{task.assigneeName}</div>
                            <div
                                className="task-cell rounded-end-2 task-cell-side-right"
                                style={{ backgroundColor: task.status?.color || '#ffffff' }}
                            >
                                {task.status?.name || 'No Status'}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;

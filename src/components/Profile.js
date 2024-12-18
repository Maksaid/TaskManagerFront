import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ userId }) => {
    const [createdTasks, setCreatedTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Fetch created tasks
                const createdTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksCreatedByUserId?userId=${user_id}`
                );
                setCreatedTasks(createdTasksResponse.data);

                // Fetch assigned tasks (optional)
                const assignedTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksAssignedToUserId?userId=${user_id}`
                );
                setAssignedTasks(assignedTasksResponse.data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err.response?.data || err.message);
                //setError(err);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId, user_id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-4">
                <strong>Error:</strong> {error.message || 'Failed to load data'}
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="user-profile border rounded p-4 shadow-sm mb-4 bg-light">
                <h1 className="mb-3">User Profile</h1>
                <p><strong>User ID:</strong> {user_id}</p>
            </div>

            <div className="tasks-section">
                <div className="mb-4">
                    <h2 className="mb-3 text-primary">Created Tasks</h2>
                    {createdTasks.length > 0 ? (
                        <ul className="list-group">
                            {createdTasks.map((task) => (
                                <li key={task.id} className="list-group-item">
                                    <a href={`/tasks/${task.id}`} className="text-decoration-none text-dark">
                                        {task.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No tasks created.</p>
                    )}
                </div>

                <div className="mb-4">
                    <h2 className="mb-3 text-primary">Assigned Tasks</h2>
                    {assignedTasks.length > 0 ? (
                        <ul className="list-group">
                            {assignedTasks.map((task) => (
                                <li key={task.id} className="list-group-item">
                                    <a href={`/tasks/${task.id}`} className="text-decoration-none text-dark">
                                        {task.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No tasks assigned.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

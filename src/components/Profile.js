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
<<<<<<< HEAD
                // Запрос на получение созданных задач
                const createdTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksCreatedByUserId?userId=${userId}`
                );
                setCreatedTasks(createdTasksResponse.data);

                // Запрос на получение назначенных задач
                const assignedTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksAssignedToUserId?userId=${userId}`
=======
                // Fetch created tasks
                const createdTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksCreatedByUserId?userId=${user_id}`
                );
                setCreatedTasks(createdTasksResponse.data);

                // Fetch assigned tasks (optional)
                const assignedTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksAssignedToUserId?userId=${user_id}`
>>>>>>> 990d09d62640434313786beb4c1f6c57bf22fde3
                );
                setAssignedTasks(assignedTasksResponse.data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err.response?.data || err.message);
<<<<<<< HEAD
                setError(err);
=======
                //setError(err);
>>>>>>> 990d09d62640434313786beb4c1f6c57bf22fde3
                setLoading(false);
            }
        };

        fetchTasks();
<<<<<<< HEAD
    }, [userId]);
=======
    }, [userId, user_id]);
>>>>>>> 990d09d62640434313786beb4c1f6c57bf22fde3

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
<<<<<<< HEAD
            <div className="user-profile border border-secondary p-4 mb-4">
                <h1 className="mb-3">User Profile</h1>
                <p className="mb-1">User ID: {userId}</p>
=======
            <div className="user-profile border rounded p-4 shadow-sm mb-4 bg-light">
                <h1 className="mb-3">User Profile</h1>
                <p><strong>User ID:</strong> {user_id}</p>
>>>>>>> 990d09d62640434313786beb4c1f6c57bf22fde3
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

<<<<<<< HEAD
            <div className="mb-4">
                <h2 className="mb-3">Created Tasks</h2>
                <ul className="list-unstyled">
                    {createdTasks.map((task, index) => (
                        <li key={index} className="mb-2">
                            <a href={`/tasks/${task.id}`}>{task.name}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Assigned Tasks</h2>
                <ul className="list-unstyled">
                    {assignedTasks.map((task, index) => (
                        <li key={index} className="mb-2">
                            <a href={`/tasks/${task.id}`}>{task.name}</a>
                        </li>
                    ))}
                </ul>
=======
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
>>>>>>> 990d09d62640434313786beb4c1f6c57bf22fde3
            </div>
        </div>
    );
};

export default Profile;

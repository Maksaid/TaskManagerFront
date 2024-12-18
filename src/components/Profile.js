import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ userId }) => {
    const [createdTasks, setCreatedTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Запрос на получение созданных задач
                const createdTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksCreatedByUserId?userId=${userId}`
                );
                setCreatedTasks(createdTasksResponse.data);

                // Запрос на получение назначенных задач
                const assignedTasksResponse = await axios.get(
                    `https://localhost:7260/api/Task/GetTasksAssignedToUserId?userId=${userId}`
                );
                setAssignedTasks(assignedTasksResponse.data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err.response?.data || err.message);
                setError(err);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="user-profile border border-secondary p-4 mb-4">
                <h1 className="mb-3">User Profile</h1>
                <p className="mb-1">User ID: {userId}</p>
            </div>

            <hr className="my-4" />

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
            </div>
        </div>
    );
};

export default Profile;

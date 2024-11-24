import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Optional: for styling

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`); // Replace with your API endpoint
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                const response = {
                    fullName: 'John Doe',
                    email: 'john.doe@example.com',
                    roleId: 1,
                    createdTasks: [
                        { name: 'Task 1' },
                        { name: 'Task 2' },
                    ],
                    assignedTasks: [
                        { name: 'Task A' },
                        { name: 'Task B' },
                    ],
                    taskCollaborators: [
                        { name: 'Collaborator 1' },
                        { name: 'Collaborator 2' },
                    ],
                    comments: [
                        { text: 'Comment 1' },
                        { text: 'Comment 2' },
                    ],
                    taskHistories: [
                        { description: 'History 1' },
                        { description: 'History 2' },
                    ],
                };
                setUser(response);
                setLoading(false);
            }
        };

        fetchUserData();
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
                <h1 className="mb-3">{user.fullName}</h1>
                <p className="mb-1">Email: {user.email}</p>
                <p className="mb-1">Role ID: {user.roleId}</p>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Created Tasks</h2>
                <ul className="list-unstyled">
                    {user.createdTasks.map((task, index) => (
                        <li key={index} className="mb-2">{task.name}</li>
                    ))}
                </ul>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Assigned Tasks</h2>
                <ul className="list-unstyled">
                    {user.assignedTasks.map((task, index) => (
                        <li key={index} className="mb-2">{task.name}</li>
                    ))}
                </ul>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Task Collaborators</h2>
                <ul className="list-unstyled">
                    {user.taskCollaborators.map((collaborator, index) => (
                        <li key={index} className="mb-2">{collaborator.name}</li>
                    ))}
                </ul>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Comments</h2>
                <ul className="list-unstyled">
                    {user.comments.map((comment, index) => (
                        <li key={index} className="mb-2">{comment.text}</li>
                    ))}
                </ul>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Task Histories</h2>
                <ul className="list-unstyled">
                    {user.taskHistories.map((history, index) => (
                        <li key={index} className="mb-2">{history.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;

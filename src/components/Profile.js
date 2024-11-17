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
                //setError(err);
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
        <div className="user-profile">
            <h1>{user.fullName}</h1>
            <p>Email: {user.email}</p>
            <p>Role ID: {user.roleId}</p>

            <h2>Created Tasks</h2>
            <ul>
                {user.createdTasks.map((task, index) => (
                    <li key={index}>{task.name}</li>
                ))}
            </ul>

            <h2>Assigned Tasks</h2>
            <ul>
                {user.assignedTasks.map((task, index) => (
                    <li key={index}>{task.name}</li>
                ))}
            </ul>

            <h2>Task Collaborators</h2>
            <ul>
                {user.taskCollaborators.map((collaborator, index) => (
                    <li key={index}>{collaborator.name}</li>
                ))}
            </ul>

            <h2>Comments</h2>
            <ul>
                {user.comments.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                ))}
            </ul>

            <h2>Task Histories</h2>
            <ul>
                {user.taskHistories.map((history, index) => (
                    <li key={index}>{history.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
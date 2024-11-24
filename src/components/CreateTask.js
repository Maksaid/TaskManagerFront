import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css'; // Optional: for styling

const defaultStatuses = [
    { Id: 1, Name: 'Implementation' },
    { Id: 2, Name: 'Done' },
    { Id: 3, Name: 'Analytics' }
];

const defaultCollaborators = [
    { Id: 1, Name: 'Иван Иванов' },
    { Id: 2, Name: 'Петр Петров' },
    { Id: 3, Name: 'Анна Смирнова' }
];

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [comment, setComment] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [availableCollaborators, setAvailableCollaborators] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://api.example.com/statuses')
            .then(response => {
                setStatuses(response.data);
            })
            .catch(error => {
                console.error('Error fetching statuses:', error);
                setStatuses(defaultStatuses);
            });

        axios.get('https://api.example.com/collaborators')
            .then(response => {
                setAvailableCollaborators(response.data);
            })
            .catch(error => {
                console.error('Error fetching collaborators:', error);
                setAvailableCollaborators(defaultCollaborators);
            });
    }, []);

    const handleAddCollaborator = (collaborator) => {
        setCollaborators(prevCollaborators => [...prevCollaborators, collaborator.Name]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            Title: title,
            Description: description,
            StatusName: status,
            Collaborators: collaborators,
            Comments: [{ Text: comment, CommentedBy: 1, CommenterName: 'User 1' }]
        };
        console.log('Task created:', newTask);
        // You can add logic to save the task to the server here
        navigate('/tasks'); // Navigate back to the tasks page
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Create New Task</h2>
            <form className="border border-secondary p-4 mb-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        {statuses.map(status => (
                            <option key={status.Id} value={status.Name}>
                                {status.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="collaborators" className="form-label">Collaborators</label>
                    <select
                        className="form-control mb-2"
                        onChange={(e) => handleAddCollaborator(availableCollaborators.find(c => c.Name === e.target.value))}
                    >
                        <option value="">Select a collaborator</option>
                        {availableCollaborators.map(collaborator => (
                            <option key={collaborator.Id} value={collaborator.Name}>
                                {collaborator.Name}
                            </option>
                        ))}
                    </select>
                    <ul className="list-unstyled">
                        {collaborators.map((collaborator, index) => (
                            <li key={index} className="mb-2">{collaborator}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea
                        className="form-control"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                </div>
                <button className="btn btn-success" type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;

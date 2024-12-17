// src/components/CreateTask.js
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
    const [assignee, setAssignee] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [availableCollaborators, setAvailableCollaborators] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response1 = await axios.get('https://localhost:7260/api/Organisation/Statuses', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                const response2 = await axios.get('https://localhost:7260/api/Organisation/Users', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                setStatuses(response1.data);
                setAvailableCollaborators(response2.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setStatuses(defaultStatuses);
                setAvailableCollaborators(defaultCollaborators);
            }
        };
        console.log(availableCollaborators);

        fetchData();

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
            Assignee: assignee
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
                        <option value="">Select a status</option>
                        {statuses.map(status => (
                            <option key={status.id} value={status.Name}>
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
                            <option key={collaborator.id} value={collaborator.name}>
                                {collaborator.name}
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
                    <label htmlFor="assignee" className="form-label">Assignee</label>
                    <select
                        className="form-control"
                        id="assignee"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        required
                    >
                        <option value="">Select an assignee</option>
                        {availableCollaborators.map(collaborator => (
                            <option key={collaborator.Id} value={collaborator.Name}>
                                {collaborator.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-success" type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css'; // Optional: for styling

const defaultStatuses = [
    { Id: 1, Name: 'Implementation' },
    { Id: 2, Name: 'Done' },
    { Id: 3, Name: 'Analytics' }
];

const defaultProjects = [
    { Id: 1, Name: 'Project A' },
    { Id: 2, Name: 'Project B' },
    { Id: 3, Name: 'Project C' }
];

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [project, setProject] = useState('');
    const [assignee, setAssignee] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [availableProjects, setAvailableProjects] = useState([]);
    const [availableCollaborators, setAvailableCollaborators] = useState([]);
    const navigate = useNavigate();
    let current_user = (localStorage.getItem("user_id"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response1 = await axios.get('https://localhost:7260/api/Organisation/Statuses', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                const response2 = await axios.get(`https://localhost:7260/api/Organisation/${org_id}`);
                const response3 = await axios.get('https://localhost:7260/api/Organisation/Users', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                setStatuses(response1.data);
                setAvailableProjects(response2.data.projects);
                setAvailableCollaborators(response3.data);
                console.log(response2);
            } catch (err) {
                console.error('Error fetching data:', err);
                //setStatuses(defaultStatuses);
                //setAvailableProjects(defaultProjects);
                //setAvailableCollaborators(defaultCollaborators);
            }
        };
        console.log(availableProjects)
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Task object to send to the API
        const newTask = {
            title: title,
            description: description,
            createdBy: current_user,
            projectId: project,
            assignedTo: assignee,
            statusId: status
        };

        console.log('Task created:', newTask);
        try {
            // Send a POST request to add the new task
            const response = await axios.post('https://localhost:7260/api/Task', newTask, {
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                }
            });

            console.log('Task successfully added:', response.data);
            navigate('/tasks/none'); // Navigate back to the tasks page
        } catch (error) {
            console.error('Error adding task:', error.response ? error.response.data : error.message);
        }
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
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="project" className="form-label">Project</label>
                    <select
                        className="form-control"
                        id="project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    >
                        <option value="">Select a project</option>
                        {availableProjects.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
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
                            <option key={collaborator.id} value={collaborator.id}>
                                {collaborator.fullName}
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

// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Project from './Project';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    localStorage.setItem("org_id", "1");
    const org_id = localStorage.getItem("org_id") === "0" ? 1 : localStorage.getItem("org_id");
    const [projects, setProjects] = useState([]);
    const [orgName, setOrgName] = useState("Undefined");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            console.log('https://localhost:7260/api/Organisation/' + org_id);
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/' + org_id);
                setProjects(response.data.projects);
                setOrgName(response.data.name);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProject = () => {
        setIsCreating(true);
    };

    const handleInputChange = (e) => {
        setNewProjectName(e.target.value);
    };

    const handleSaveProject = async () => {
        try {
            const response = await axios.post('https://localhost:7260/api/Project', {
                organizationId: org_id,
                name: newProjectName
            });
            console.log('Project created:', response.data);
            setProjects([...projects, response.data]);
            setIsCreating(false);
            setNewProjectName('');
        } catch (err) {
            console.error('Error creating project:', err);
        }
    };

    const handleEditProject = (projectId) => {
        navigate(`/edit-project/${projectId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="m-5">{orgName}</h1>
            <h3 className="m-5">Projects:</h3>
            <div className="m-4">
                <button
                    className="btn btn-primary m-4"
                    onClick={handleCreateProject}
                >
                    Create Project
                </button>
            </div>
            {isCreating && (
                <div className="m-4">
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                        placeholder="Enter project name"
                    />
                    <button className="btn btn-success" onClick={handleSaveProject}>Save</button>
                </div>
            )}
            {projects.map((project, index) => (
                <div key={index} className="m-3">
                    <Project
                        projectName={project.name}
                        projectId={project.id}
                        onEdit={() => handleEditProject(project.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Home;

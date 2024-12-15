import './Project.css';
// src/components/Project.js
import React, { useState } from 'react';
import axios from 'axios';

const Project = ({ projectName, projectId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newProjectName, setNewProjectName] = useState(projectName);
    const [projId, setProjectId] = useState(projectId);
    let org_id = localStorage.getItem("org_id");
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        setNewProjectName(e.target.value);
    };

    const handleSave = async () => {
        try {
            console.log(newProjectName, org_id, projId);
            const response = await axios.put('https://localhost:7260/api/Project', {
                id: projId,
                name: newProjectName,
                organizationId: org_id
            });
            console.log(response.data.name)
            setNewProjectName(response.data.name)
            console.log('Project updated:', response.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating project:', err);
        }
    };

    return (
        <div className="project-card">
            {isEditing ? (
                <div className="d-flex justify-content-evenly">
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                    />
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <h1 className="project-name">{newProjectName}</h1>
            )}
            <button
                className="btn btn-secondary edit-button"
                onClick={handleEditClick}
            >
                Edit
            </button>
        </div>
    );
};

export default Project;

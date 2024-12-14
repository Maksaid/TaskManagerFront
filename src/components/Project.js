import React from 'react';
import './Project.css';

const Project = ({ projectName, onEdit }) => {
    return (
        <div className="project-card">
            <h1 className="project-name">{projectName}</h1>
            <button
                className="btn btn-secondary edit-button"
                onClick={onEdit}
            >
                Edit
            </button>
        </div>
    );
};

export default Project;

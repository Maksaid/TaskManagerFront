import React from 'react';
import './Project.css';

const Project = ({ projectName, onEdit }) => {
    return (
        <div className="project-card">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="project-name">{projectName}</h1>
                <button
                    className="btn btn-secondary edit-button" // Теперь используем кастомный класс для отступа
                    onClick={onEdit}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default Project;

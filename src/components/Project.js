import React from 'react';
import './Project.css';

const Project = ({ projectName }) => {
    return (
        <div className="project-card">
            <h1 className="project-name">{projectName}</h1>
            {/* Add other content here */}
        </div>
    );
};

export default Project;
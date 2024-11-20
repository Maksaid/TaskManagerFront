import React from 'react';
import './Project.css';
import {Link} from "react-router-dom"; // Optional: for styling

const Project = ({ img_path, projectName, project_id }) => {
    return (
        <Link to={`/projects/${project_id}`} className="project-card">
            <img className="project-img" src={img_path} alt={`${projectName} Logo`} />
            <h1 className="project-name">{projectName}</h1>
            {/* Add other content here */}
        </Link>
    );
};

export default Project;
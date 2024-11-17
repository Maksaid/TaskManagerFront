import React from 'react';
import './Project.css'
import logo from "../images/images.png"
const Project = () => {
    return (
        <div className="project-card">
            <img className="project-img" src={logo} alt="Logo"/>
            <h1 className="project-name">projectname</h1>
            {/* Добавьте здесь содержимое страницы задачи */}
        </div>
    );
};

export default Project;

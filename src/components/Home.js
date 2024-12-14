import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Project from './Project';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Для перенаправления при нажатии кнопок
    localStorage.setItem("org_id", "1");
    const org_id = localStorage.getItem("org_id") === "0" ? 1 : localStorage.getItem("org_id");
    const [projects, setProjects] = useState([]);
    const [orgName, setOrgName] = useState("Undefined");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            console.log('https://localhost:7260/api/Organisation/' + org_id);
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/' + org_id);
                setProjects(response.data.projects);
                setOrgName(response.data.name);
                localStorage.setItem("projects", JSON.stringify(response.data.projects));
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProject = () => {
        navigate('/create-project'); // Перенаправление на страницу создания проекта
    };

    const handleEditProject = (projectId) => {
        navigate(`/edit-project/${projectId}`); // Перенаправление на страницу редактирования проекта
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
                    className="btn btn-primary"
                    onClick={handleCreateProject}
                >
                    Create Project
                </button>
            </div>
            {projects.map((project, index) => (
                <div key={index} className="m-3">
                    <Project
                        projectName={project.name}
                        onEdit={() => handleEditProject(project.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Project from './Project'; // Make sure to import your Project component
import ims from '../images/images.png'
import ims2 from '../images/logo512.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

const Home = () => {
    const org_id = localStorage.getItem("org_id");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            console.log('https://localhost:7260/api/Organisation/' + org_id)
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/' + org_id); // Replace with your API endpoint
                setProjects(response.data.projects);
                localStorage.setItem("project", JSON.stringify(projects));
                setLoading(false);
            } catch (err) {
                //setError(err);
                setProjects([{image_path : (ims), project_name : "project", project_id : "1"}, {image_path : ims2, project_name : "images.png", project_id : "2"},{image_path : ims, project_name : "../images/logo512.png", project_id : "3"},{image_path : ims2, project_name : "../images/images.png", project_id : "4"}])
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
            <h1 className="m-5">Tasker incorporation</h1>
            <h3 className="m-4">Projects:</h3>
            {projects.map((project, index) => (
                <Link key={index} to={`/tasks/${project.project_id}`} className="text-decoration-none">
                    <Project img_path={project.image_path} projectName={project.project_name} project_id={project.project_id} />
                </Link>
            ))}
        </div>
    );
};

export default Home;
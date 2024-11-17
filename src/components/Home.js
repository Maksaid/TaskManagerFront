import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Project from './Project'; // Make sure to import your Project component
import ims from '../images/images.png'
import ims2 from '../images/logo512.png'
const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects'); // Replace with your API endpoint
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                //setError(err);
                setProjects([{image_path : (ims), project_name : "project"}, {image_path : ims2, project_name : "images.png"},{image_path : ims, project_name : "../images/logo512.png"},{image_path : ims2, project_name : "../images/images.png"}])
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
            <h1>Company Name</h1>
            <h3>Projects:</h3>
            {projects.map((project, index) => (
                <Project key={index} img_path={project.image_path} projectName={project.project_name} />
            ))}
        </div>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommitHistory from './CommitHistory';
import TaskDescription from './TaskDescription';
import './TaskDetail.css';
import { useParams } from "react-router-dom";
import task from "./Task";
import TaskComments from "./TaskComments";


const TaskDetail = () => {
    let { taskId } = useParams();
    let org_id = localStorage.getItem("org_id");

    const [entity, setEntity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [assignees, setAssignees] = useState([]); // Add state for assignees

    useEffect(() => {
        // Fetch task details
        axios.get(`https://localhost:7260/api/Task/GetTaskDetails?taskId=${taskId}`)
            .then(response => {
                setEntity(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching task details:', error);
            });

        // Fetch statuses
        axios.get('https://localhost:7260/api/Organisation/Statuses', {
            params: { organization: org_id }
        })
            .then(response => {
                setStatuses(response.data);
            })
            .catch(error => {
                console.error('Error fetching statuses:', error);
                //setStatuses(defaultStatuses);
            });
        // Fetch assignees (users)
        axios.get('https://localhost:7260/api/Organisation/Users', {
            params: { organization: org_id }
        })
            .then(response => {
                setAssignees(response.data);
            })
            .catch(error => {
                console.error('Error fetching assignees:', error);
                //setAssignees(defaultCollaborators);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [taskId, org_id]);

    const handleEdit = () => setIsEditing(true);

    const handleSave = () => {
        setIsEditing(false);
        taskId = taskId - 1 + 1;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-4">
            <TaskDescription
                isEditing={isEditing}
                entity={entity}
                setEntity={setEntity}
                handleSave={handleSave}
                statuses={statuses}
                assignees={assignees} // Pass the assignees here
            />
            {!isEditing && <button className="btn btn-primary" onClick={handleEdit}>Edit</button>}
            <TaskComments taskId={entity.id} task_comments={entity.comments} />

            <hr className="my-4" />
            <CommitHistory owner={entity.commitHistory.RepositoryOwner}
                           branch={entity.commitHistory.BranchName}
                           repo={entity.commitHistory.RepositoryName}/>
        </div>
    );
};

export default TaskDetail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommitHistory from './CommitHistory';
import TaskDescription from './TaskDescription';
import './TaskDetail.css';
import { useParams } from "react-router-dom";
import TaskComments from "./TaskComments";

const TaskDetail = () => {
    let { taskId } = useParams();
    let org_id = localStorage.getItem("org_id");

    const [entity, setEntity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [assignees, setAssignees] = useState([]);

    // Form inputs
    const [repoOwner, setRepoOwner] = useState('');
    const [repoName, setRepoName] = useState('');
    const [branchName, setBranchName] = useState('');

    useEffect(() => {
        axios.get(`https://localhost:7260/api/Task/GetTaskDetails?taskId=${taskId}`)
            .then(response => {
                setEntity(response.data);
            })
            .catch(error => {
                console.error('Error fetching task details:', error);
            });

        axios.get('https://localhost:7260/api/Organisation/Statuses', {
            params: { organization: org_id }
        })
            .then(response => {
                setStatuses(response.data);
            })
            .catch(error => {
                console.error('Error fetching statuses:', error);
            });

        axios.get('https://localhost:7260/api/Organisation/Users', {
            params: { organization: org_id }
        })
            .then(response => {
                setAssignees(response.data);
            })
            .catch(error => {
                console.error('Error fetching assignees:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [taskId, org_id]);

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => setIsEditing(false);

    const handleCreateCommitHistory = async (e) => {
        e.preventDefault();
        try {
            // Create commit history
            const response = await axios.post('https://localhost:7260/api/CommitHistory', {
                repositoryOwner: repoOwner,
                repositoryName: repoName,
                branchName: branchName,
            });

            const commitHistoryId = response.data.id;

            // Update the task with the new commit history ID
            await axios.put(`https://localhost:7260/api/Task`, {
                id: entity.id,
                title: entity.title,
                description: entity.description,
                assignedTo: entity.AssigneeName,
                statusId: entity.StatusName,
                projectId: entity.projectId,
                createdBy: entity.createdBy,
                commitHistoryId: commitHistoryId,
            });

            // Refresh task details
            const updatedTaskResponse = await axios.get(`https://localhost:7260/api/Task/GetTaskDetails?taskId=${taskId}`);
            setEntity(updatedTaskResponse.data);

            // Clear the form inputs
            setRepoOwner('');
            setRepoName('');
            setBranchName('');
            alert('Commit history created and task updated successfully!');
        } catch (error) {
            console.error('Error creating commit history or updating task:', error);
            alert('An error occurred. Please try again.');
        }
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
                assignees={assignees}
            />
            {!isEditing && <button className="btn btn-primary" onClick={handleEdit}>Edit</button>}
            <TaskComments taskId={entity.id} task_comments={entity.comments} />

            <hr className="my-4" />
            <CommitHistory commitHistory={entity.commitHistory} />

            <div className="mt-4">
                <h3>Create Commit History</h3>
                <form onSubmit={handleCreateCommitHistory}>
                    <div className="mb-3">
                        <label htmlFor="repoOwner" className="form-label">Repository Owner</label>
                        <input
                            type="text"
                            id="repoOwner"
                            className="form-control"
                            value={repoOwner}
                            onChange={(e) => setRepoOwner(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repoName" className="form-label">Repository Name</label>
                        <input
                            type="text"
                            id="repoName"
                            className="form-control"
                            value={repoName}
                            onChange={(e) => setRepoName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="branchName" className="form-label">Branch Name</label>
                        <input
                            type="text"
                            id="branchName"
                            className="form-control"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Create Commit History</button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetail;

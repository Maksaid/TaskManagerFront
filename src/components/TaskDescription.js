import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TaskDescription = ({ isEditing, entity, setEntity, assignees, handleSave }) => {
    const [availableProjects, setAvailableProjects] = useState([]);
    const [availableCollaborators, setAvailableCollaborators] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [tempEntity, setTempEntity] = useState(entity); // Temporary state for editing

    useEffect(() => {
        setTempEntity(entity); // Sync tempEntity with the original entity on edit start
    }, [entity]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orgId = localStorage.getItem("org_id");
                console.log(entity)
                const [statusesResponse, organizationResponse, usersResponse] = await Promise.all([
                    axios.get(`https://localhost:7260/api/StatusTransition/GetStatusTransitionsToFrom?statusId=${entity.statusId}`),
                    axios.get(`https://localhost:7260/api/Organisation/${orgId}`),
                    axios.get('https://localhost:7260/api/Organisation/Users', { params: { organization: orgId } }),
                ]);

                setStatuses(statusesResponse.data);
                console.log(statusesResponse.data)
                setAvailableProjects(organizationResponse.data.projects);
                setAvailableCollaborators(usersResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const handleSaveClick = () => {
        const data = {
            id: tempEntity.id,
            title: tempEntity.title,
            description: tempEntity.description,
            assignedTo: tempEntity.AssigneeName,
            statusId: tempEntity.StatusName,
            projectId: tempEntity.projectId,
            createdBy: tempEntity.createdBy,
        };

        axios.put(`https://localhost:7260/api/Task/`, data)
            .then(response => {
                console.log('Task updated successfully:', response.data);
                setEntity(response.data); // Update main state after successful save
                console.log(entity);
                handleSave(); // Exit edit mode
            })
            .catch(error => {
                console.error('Error updating task:', error);
                alert('Failed to save the task. Please try again.');
            });
    };

    return (
        <div className="border border-secondary p-4 mb-4">
            {isEditing ? (
                <>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={tempEntity.title || ''}
                            onChange={(e) => setTempEntity({ ...tempEntity, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={tempEntity.description || ''}
                            onChange={(e) => setTempEntity({ ...tempEntity, description: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="assignee" className="form-label">Assigned To</label>
                        <select
                            className="form-control"
                            id="assignee"
                            value={tempEntity.AssigneeName || ''}
                            onChange={(e) => setTempEntity({ ...tempEntity, AssigneeName: e.target.value })}
                        >
                            <option value="">Select an assignee</option>
                            {assignees.map(assignee => (
                                <option key={assignee.Id} value={assignee.id}>
                                    {assignee.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-control"
                            id="status"
                            value={tempEntity.StatusName || ''}
                            onChange={(e) => setTempEntity({ ...tempEntity, StatusName: e.target.value })}
                        >
                            <option value="">Select a status</option>
                            {statuses.map(status => (
                                <option key={status.Id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="project" className="form-label">Project</label>
                        <select
                            className="form-control"
                            id="project"
                            value={tempEntity.projectId || ''}
                            onChange={(e) => setTempEntity({ ...tempEntity, projectId: e.target.value })}
                        >
                            <option value="">Select a project</option>
                            {availableProjects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn btn-success" onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <h1 className="mb-3">{entity.title}</h1>
                    <p className="mb-4">{entity.description}</p>
                    <p className="mb-1"><strong>Created By:</strong> {entity.creatorName}</p>
                    <p className="mb-1"><strong>Assigned To:</strong> {entity.assigneeName || 'N/A'}</p>
                    <p
                        className="mb-1 rounded-1 w-25"
                        style={{ backgroundColor: entity.status?.color || '#ffffff' }}
                    >
                        <strong>Status:</strong> {entity.status?.name || 'N/A'}
                    </p>

                </>
            )}
        </div>
    );
};

TaskDescription.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    entity: PropTypes.object.isRequired,
    setEntity: PropTypes.func.isRequired,
    assignees: PropTypes.array.isRequired,
    handleSave: PropTypes.func.isRequired,
};

export default TaskDescription;

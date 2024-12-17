import React from 'react';
import PropTypes from 'prop-types';

const TaskDescription = ({ isEditing, entity, setEntity, handleSave, statuses, assignees }) => {
    console.log(entity);

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
                            value={entity.title || ''}
                            onChange={(e) => setEntity({ ...entity, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={entity.description || ''}
                            onChange={(e) => setEntity({ ...entity, description: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="assignee" className="form-label">Assigned To</label>
                        <select
                            className="form-control"
                            id="assignee"
                            value={entity.AssigneeName || ''}
                            onChange={(e) => setEntity({ ...entity, AssigneeName: e.target.value })}
                        >
                            <option value="">Select an assignee</option>
                            {assignees.map(assignee => (
                                <option key={assignee.Id} value={assignee.fullName}>
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
                            value={entity.StatusName || ''}
                            onChange={(e) => setEntity({ ...entity, StatusName: e.target.value })}
                        >
                            <option value="">Select a status</option>
                            {statuses.map(status => (
                                <option key={status.Id} value={status.name}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <h1 className="mb-3">{entity.title}</h1>
                    <p className="mb-4">{entity.description}</p>
                    <p className="mb-1"><strong>Created By:</strong> {entity.creatorName}</p>
                    <p className="mb-1"><strong>Assigned To:</strong> {entity.assigneeName || 'N/A'}</p>
                    <p className="mb-1"><strong>Status:</strong> {entity.statusName || 'N/A'}</p>
                </>
            )}
        </div>
    );
};

TaskDescription.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    entity: PropTypes.object.isRequired,
    setEntity: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    statuses: PropTypes.array.isRequired,
    assignees: PropTypes.array.isRequired,
};

export default TaskDescription;

import React from 'react';
import PropTypes from 'prop-types';

const TaskDescription = ({ isEditing, entity, setEntity, handleSave, statuses }) => {
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
                            value={entity.Title}
                            onChange={(e) => setEntity({ ...entity, Title: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={entity.Description}
                            onChange={(e) => setEntity({ ...entity, Description: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dueDate"
                            value={entity.DueDate}
                            onChange={(e) => setEntity({ ...entity, DueDate: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="creatorName" className="form-label">Created By</label>
                        <input
                            type="text"
                            className="form-control"
                            id="creatorName"
                            value={entity.CreatorName}
                            onChange={(e) => setEntity({ ...entity, CreatorName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assigneeName" className="form-label">Assigned To</label>
                        <input
                            type="text"
                            className="form-control"
                            id="assigneeName"
                            value={entity.AssigneeName}
                            onChange={(e) => setEntity({ ...entity, AssigneeName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-control"
                            id="status"
                            value={entity.StatusName}
                            onChange={(e) => setEntity({ ...entity, StatusName: e.target.value })}
                        >
                            {statuses.map(status => (
                                <option key={status.Id} value={status.Name}>
                                    {status.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <h1 className="mb-3">{entity.Title}</h1>
                    <p className="mb-4">{entity.Description}</p>
                    <p className="mb-1">Due Date: {entity.DueDate ? new Date(entity.DueDate).toLocaleDateString() : 'N/A'}</p>
                    <p className="mb-1">Created By: {entity.CreatorName}</p>
                    <p className="mb-1">Assigned To: {entity.AssigneeName || 'N/A'}</p>
                    <p className="mb-1">Status: {entity.StatusName || 'N/A'}</p>

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
};

export default TaskDescription;

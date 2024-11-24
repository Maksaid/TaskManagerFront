import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommitHistory from './CommitHistory';
import TaskDescription from './TaskDescription';
import './TaskDetail.css'; // Import the CSS file

const defaultEntity = {
    Id: 0,
    Title: 'Default Task',
    Description: 'Реализовать бэкенд для нашей благоприятной успеваемости на приятном предмете со звучным названием СВИ, Я в тебя верюю Владислав, ты справишься',
    DueDate: '2018-02-03',
    CreatedBy: 0,
    CreatorName: 'Maksim the Creator',
    AssignedTo: 'Vladi dadi',
    AssigneeName: 'Vladi dadi',
    StatusId: null,
    StatusName: 'In Progress',
    Comments: [
        { Id: 1, Text: 'пофиксил какашку', TaskId: 1, TaskName: 'Task 1', CommentedBy: 1, CommenterName: 'User 1' },
        { Id: 2, Text: 'исправил багу', TaskId: 1, TaskName: 'Task 1', CommentedBy: 2, CommenterName: 'User 2' }
    ],
    Collaborators: ["Казимир Казимирович З.", "Ирина Шоколадовна"]
};

const defaultStatuses = [
    { Id: 1, Name: 'Implementation' },
    { Id: 2, Name: 'Done' },
    { Id: 3, Name: 'Analytics' }
];

const defaultCollaborators = [
    { Id: 1, Name: 'Иван Иванов' },
    { Id: 2, Name: 'Петр Петров' },
    { Id: 3, Name: 'Анна Смирнова' }
];

const TaskDetail = () => {
    const [entity, setEntity] = useState(defaultEntity);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [availableCollaborators, setAvailableCollaborators] = useState([]);

    useEffect(() => {
        axios.get('https://api.example.com/entity')
            .then(response => {
                setEntity(response.data);
            })
            .catch(error => {
                console.error('Error fetching entity data:', error);
                //setError(error);
            });

        axios.get('https://api.example.com/statuses')
            .then(response => {
                setStatuses(response.data);
            })
            .catch(error => {
                console.error('Error fetching statuses:', error);
                setStatuses(defaultStatuses);
            })
            .finally(() => {
                setLoading(false);
            });

        axios.get('https://api.example.com/collaborators')
            .then(response => {
                setAvailableCollaborators(response.data);
            })
            .catch(error => {
                console.error('Error fetching collaborators:', error);
                setAvailableCollaborators(defaultCollaborators);
            });
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Save the changes to the server
        axios.put(`https://api.example.com/entity/${entity.Id}`, entity)
            .then(response => {
                setEntity(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error saving entity data:', error);
                setError(error);
            });
    };

    const handleAddComment = () => {
        const comment = {
            Id: entity.Comments.length + 1,
            Text: newComment,
            TaskId: entity.Id,
            TaskName: entity.Title,
            CommentedBy: entity.CreatedBy,
            CommenterName: entity.CreatorName
        };
        setEntity(prevEntity => ({
            ...prevEntity,
            Comments: [...prevEntity.Comments, comment]
        }));
        setNewComment('');
    };

    const handleAddCollaborator = (collaborator) => {
        setEntity(prevEntity => ({
            ...prevEntity,
            Collaborators: [...prevEntity.Collaborators, collaborator.Name]
        }));
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
            />
            {!isEditing && <button className="btn btn-primary" onClick={handleEdit}>Edit</button>}

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Collaborators</h2>
                <ul className="list-unstyled">
                    {entity.Collaborators.map((collaborator, index) => (
                        <li key={index} className="mb-2">{collaborator}</li>
                    ))}
                </ul>
                <div className="mb-3">
                    <select
                        className="form-control mb-2"
                        onChange={(e) => handleAddCollaborator(availableCollaborators.find(c => c.Name === e.target.value))}
                    >
                        <option value="">Select a collaborator</option>
                        {availableCollaborators.map(collaborator => (
                            <option key={collaborator.Id} value={collaborator.Name}>
                                {collaborator.Name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-success" onClick={() => {}}>Add Collaborator</button>
                </div>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h2 className="mb-3">Comments</h2>
                <ul className="comments-list list-unstyled">
                    {entity.Comments.map(comment => (
                        <li key={comment.Id} className="comment-item mb-3">
                            <strong className="commenter-name">{comment.CommenterName}:</strong> {comment.Text}
                        </li>
                    ))}
                </ul>
                <div className="mb-3">
                    <textarea
                        className="form-control mb-2"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button className="btn btn-success" onClick={handleAddComment}>Add Comment</button>
                </div>
            </div>

            <hr className="my-4" />

            <CommitHistory />
        </div>
    );
};

export default TaskDetail;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TaskComments = ({ taskId, task_comments }) => {
    const [comments, setComments] = useState(task_comments);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`https://localhost:7260/api/Comment`, {
                text: newComment,
                taskId: taskId,
                commentedBy: localStorage.getItem("user_id")
            });
            setComments([...comments, response.data]); // Add the new comment to the list
            setNewComment(""); // Clear the input
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Failed to add comment. Please try again.");
        }
    };

    return (
        <div className="mt-4">
            <h3>Comments</h3>
            <ul className="list-group mb-3">
                {comments.map(comment => (
                    <li key={comment.id} className="list-group-item">
                        <strong>{comment.commenterName}:</strong> {comment.text}
                    </li>
                ))}
            </ul>
            <div className="d-flex">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddComment}>
                    Submit
                </button>
            </div>
        </div>
    );
};

TaskComments.propTypes = {
    taskId: PropTypes.string.isRequired,
};

export default TaskComments;

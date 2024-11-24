// src/CommitHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommitHistory.css'; // Import the CSS file

const CommitHistory = ({ owner, repo, branch }) => {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://api.github.com/repos/NaMe2te/TaskManager/commits?sha=master`)
            .then(response => {
                setCommits(response.data);
            })
            .catch(error => {
                console.error('Error fetching commit history:', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [owner, repo, branch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading commit history.</div>;
    }

    return (
        <div>
            <h1>Commit History</h1>
            <ul className="commit-tree">
                {commits.map(commit => (
                    <li key={commit.sha} className="commit-item">
                        <strong>{commit.sha.substring(0, 7)}</strong> - { commit.commit.message}
                        <em className="font-monospace">  - by {commit.commit.author.name}</em>
                        <div className="commit-item-empty-line"></div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommitHistory;

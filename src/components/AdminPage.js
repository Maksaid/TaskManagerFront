// src/components/AdminPage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReactFlow, { ReactFlowProvider, MiniMap, useNodesState, useEdgesState, Controls, Background, addEdge } from 'react-flow-renderer';
import { SmoothStepEdge } from "react-flow-renderer";

const AdminPage = () => {
    const defaultStatuses = ['Draft', 'Analytics', 'Development', 'Testing'];
    const defaultTransitions = [
        { id: 'e1-2', source: 'Draft', target: 'Analytics', animated: true },
        { id: 'e1-3', source: 'Draft', target: 'Development', animated: true },
        { id: 'e3-4', source: 'Development', target: 'Testing', animated: true },
        { id: 'e4-3', source: 'Testing', target: 'Development', animated: true },
    ];

    const [statuses, setStatuses] = useState(defaultStatuses);
    const [fromStatus, setFromStatus] = useState('');
    const [toStatus, setToStatus] = useState('');
    const [transitions, setTransitions] = useState(defaultTransitions);
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [newStatus, setNewStatus] = useState('');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response = await axios.get('https://localhost:7260/api/Organisation/Statuses', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                console.log(response.data)
                setStatuses(response.data);
            } catch (err) {
                setStatuses(defaultStatuses);
            } finally {
                setLoading(false);
            }
        };

        const fetchTransitions = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response = await axios.get('https://localhost:7260/api/Organisation/StatusTransition', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                setTransitions(response.data);
            } catch (err) {
                setTransitions(defaultTransitions);
            } finally {
                updateElements();
            }
        };

        const fetchUsers = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response = await axios.get('https://localhost:7260/api/Organisation/Users', {
                    params: { organization: org_id } // Add the organizationId as a query parameter
                });
                const usersData = response.data;
                setUsers(usersData);

                /*// Group users by role
                const rolesMap = usersData.reduce((acc, user) => {
                    if (!acc[user.role_id]) {
                        acc[user.role_id] = [];
                    }
                    acc[user.role_id].push(user);
                    return acc;
                }, {});*/

                /*setRoles(Object.keys(rolesMap).map(roleId => ({
                    roleId,
                    users: rolesMap[roleId]
                })));*/
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchStatuses();
        fetchTransitions();
        fetchUsers();
    }, []);

    const updateElements = () => {
        const nodes = statuses.map((status, index) => ({
            id: status,
            data: { label: status },
            position: { x: 300 * (index + 1), y: 100 },
        }));

        const edges = transitions.map((transition, index) => ({
            id: `edge-${index}`,
            source: transition.source,
            target: transition.target,
            animated: true,
        }));

        setNodes(nodes);
        setEdges(edges);
    };

    const handleAddTransition = () => {
        if (fromStatus && toStatus) {
            const newTransition = {
                id: `e${fromStatus}-${toStatus}`,
                source: fromStatus,
                target: toStatus,
                animated: true,
            };
            setTransitions([...transitions, newTransition]);
            setFromStatus('');
            setToStatus('');
            updateElements();
        }
    };

    const handleAddStatus = async () => {
        if (newStatus) {
            try {
                let org_id = localStorage.getItem("org_id");
                const response = await axios.post('https://localhost:7260/api/Status', {
                    organizationId: org_id,
                    name: newStatus
                });
                setStatuses([...statuses, response.data]);
                setNewStatus('');
                updateElements();
            } catch (err) {
                console.error('Error adding status:', err);
            }
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div className="m-5">
            <h1 className="mb-4">Admin Page</h1>
            <section>
                <h2 className="mb-4">Status Transitions</h2>
                <div className="d-flex flex-row justify-content-between w-25">
                    <div className="form-group">
                        <label htmlFor="fromStatus">From Status:</label>
                        <select
                            className="form-control"
                            id="fromStatus"
                            value={fromStatus}
                            onChange={(e) => setFromStatus(e.target.value)}
                        >
                            <option value="">Select</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.name}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="toStatus">To Status:</label>
                        <select
                            className="form-control"
                            id="toStatus"
                            value={toStatus}
                            onChange={(e) => setToStatus(e.target.value)}
                        >
                            <option value="">Select</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.name}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary mb-4 ml-3" onClick={handleAddTransition}>
                    Add Transition
                </button>
                <div>
                    <h3 className="mb-3">Current Transitions</h3>
                    <ReactFlowProvider>
                        <ReactFlow nodes={nodes} edges={edges} style={{ height: 500 }} onNodesChange={onNodesChange}
                                   onEdgesChange={onEdgesChange}
                                   onConnect={onConnect}>
                            <MiniMap />
                            <Controls />
                            <Background />
                        </ReactFlow>
                    </ReactFlowProvider>
                </div>
                <div className="mt-4">
                    <h2 className="mb-3">Add New Status</h2>
                    <input
                        type="text"
                        placeholder="New Status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="form-control mb-2"
                    />
                    <button className="btn btn-success" onClick={handleAddStatus}>Add Status</button>
                </div>
                <h2 className="mb-4">Users</h2>
                <div className="d-flex flex-row justify-content-between w-25">
                    {roles.map((role) => (
                        <div key={role.roleId} className="mb-4">
                            <h3>{`Role ${role.roleId}`}</h3>
                            <ul className="list-unstyled">
                                {role.users.map((user, index) => (
                                    <li key={index} className="mb-2">{user.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPage;

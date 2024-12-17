// src/components/AdminPage.js
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    addEdge
} from 'react-flow-renderer';
import {SketchPicker} from 'react-color';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPageUsersAndRoles from "./AdminPageUsersAndRoles";

const AdminPage = () => {
    //const defaultStatuses = ['Draft', 'Analytics', 'Development', 'Testing'];
    /*const defaultTransitions = [
        {id: 'e1-2', source: 'Draft', target: 'Analytics', animated: true},
        {id: 'e1-3', source: 'Draft', target: 'Development', animated: true},
        {id: 'e3-4', source: 'Development', target: 'Testing', animated: true},
        {id: 'e4-3', source: 'Testing', target: 'Development', animated: true},
    ];*/
    let org_id = localStorage.getItem("org_id");

    const [statuses, setStatuses] = useState([]);
    const [fromStatus, setFromStatus] = useState('');
    const [toStatus, setToStatus] = useState('');
    const [transitions, setTransitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [newStatus, setNewStatus] = useState('');
    const [newStatusColor, setNewStatusColor] = useState('#ffffff');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editingRole, setEditingRole] = useState(null);
    const [newRole, setNewRole] = useState('');
    //const [roles, setRoles] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');

    useEffect(() => {
        if (statuses.length && transitions.length) {
            updateElements();
        }
    }, [statuses, transitions]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response = await axios.get('https://localhost:7260/api/Organisation/Statuses', {
                    params: {organization: org_id} // Add the organizationId as a query parameter
                });
                //console.log(response.data);
                setStatuses(response.data);
            } catch (err) {
                console.log("failed to fetch statuses " + err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchTransitions = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/StatusTransition', {
                    params: {organization: org_id} // Add the organizationId as a query parameter
                });
                //console.log(response);
                setTransitions(response.data);
            } catch (err) {
                setTransitions([]);
            } finally {
                updateElements();
            }
        };

        const fetchUsers = async () => {
            try {
                let org_id = localStorage.getItem("org_id");
                const response = await axios.get('https://localhost:7260/api/Organisation/Users', {
                    params: {organization: org_id} // Add the organizationId as a query parameter
                });
                const usersData = response.data;
                setUsers(usersData);

                // Group users by role
                /*const rolesMap = ausersData.reduce((acc, user) => {
                    if (!acc[user.role_id]) {
                        acc[user.role_id] = [];
                    }
                    acc[user.role_id].push(user);
                    return acc;
                }, {});

                setRoles(Object.keys(rolesMap).map(roleId => ({
                    roleId,
                    users: rolesMap[roleId]
                })));*/
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Roles', {
                    params: { organization: org_id }
                });
                setRoles(response.data);
            } catch (err) {
                console.error("Error fetching roles: ", err);
            }
        };

        fetchStatuses();
        fetchTransitions();
        fetchUsers();
        fetchRoles();
        updateElements();
    }, []);
    useEffect(() => {
        updateElements();
    },[org_id])

    const updateElements = (currentStatuses = statuses, currentTransitions = transitions) => {
        console.log("after", currentTransitions);
            const nodes = currentStatuses.map((status, index) => ({
                id: status.id.toString(),
                data: {label: status.name},
                position: {x: 300 * (index + 1), y: 100},
                style: {
                    background: status.color || '#ffffff', // Default to white if no color is set
                    color: '#000', // Text color
                    border: '1px solid #333', // Optional border styling
                },
            }));

            const edges = currentTransitions.map((transition, index) => ({
                id: `edge-${index}`,
                source: transition.fromId.toString(),
                target: transition.toId.toString(),
                animated: true,
            }));

        setNodes(nodes);
        setEdges(edges);
    };


    const handleAddTransition = async () => {

        if (fromStatus && toStatus) {
            try {
                const response = await axios.post('https://localhost:7260/api/StatusTransition', {
                    organizationId: org_id,
                    fromId: fromStatus,
                    toId: toStatus
                });

                setTransitions((prevTransitions) => {
                    const updatedTransitions = [...prevTransitions, response.data];
                    updateElements(statuses, updatedTransitions); // Call updateElements with the new transitions
                    return updatedTransitions;
                });

                setFromStatus('');
                setToStatus('');
            } catch (err) {
                console.error('Error adding transition:', err);
            }
        }
    };
    const handleEditUser = async (userId, roleId) => {
        try {
            await axios.put(`https://localhost:7260/api/Users/${userId}/Role`, { roleId });
            setUsers(users.map(user => user.id === userId ? { ...user, roleId } : user));
            setEditingUser(null);
        } catch (err) {
            console.error("Error updating user role: ", err);
        }
    };

    const handleAddRole = async () => {
        if (newRole) {
            try {
                const response = await axios.post('https://localhost:7260/api/Roles', {
                    organizationId: org_id,
                    name: newRole
                });
                setRoles([...roles, response.data]);
                setNewRole('');
            } catch (err) {
                console.error("Error adding role: ", err);
            }
        }
    };
    const handleEditRole = async (roleId, name) => {
        try {
            await axios.put(`https://localhost:7260/api/Roles/${roleId}`, { name });
            setRoles(roles.map(role => role.id === roleId ? { ...role, name } : role));
            setEditingRole(null);
        } catch (err) {
            console.error("Error updating role: ", err);
        }
    };

    const handleDeleteRole = async (roleId) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await axios.delete(`https://localhost:7260/api/Roles/${roleId}`);
                setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
            } catch (err) {
                console.error('Error deleting role:', err);
            }
        }
    };

// Update user role
    const handleUserRoleUpdate = async (userId, newRoleId) => {
        try {
            const response = await axios.put(`https://localhost:7260/api/Users/${userId}`, {
                roleId: newRoleId,
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? { ...user, roleId: newRoleId } : user))
            );
        } catch (err) {
            console.error('Error updating user role:', err);
        }
    };
    const handleAddStatus = async () => {
        if (newStatus) {
            try {
                const response = await axios.post('https://localhost:7260/api/Status', {
                    organizationId: org_id,
                    name: newStatus,
                    color: newStatusColor
                });

                setStatuses([...statuses, response.data]);
                setNewStatus('');
                setNewStatusColor('#ffffff');
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
                                <option key={status.id} value={status.id}>
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
                                <option key={status.id} value={status.id}>
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
                        <ReactFlow nodes={nodes} edges={edges} style={{height: 500}} onNodesChange={onNodesChange}
                                   onEdgesChange={onEdgesChange}
                                   onConnect={onConnect}>
                            <MiniMap/>
                            <Controls/>
                            <Background/>
                        </ReactFlow>
                    </ReactFlowProvider>
                </div>
                <div className="mt-4">
                    <h2 className="mb-3">Add New Status</h2>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            placeholder="New Status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="form-control mb-2 me-2"
                            style={{width: '200px'}}
                        />
                        <SketchPicker
                            color={newStatusColor}
                            onChangeComplete={(color) => setNewStatusColor(color.hex)}
                            className="me-2"
                        />
                        <button className="btn btn-success" onClick={handleAddStatus}>Add Status</button>
                    </div>
                </div>
                <AdminPageUsersAndRoles/>
            </section>
        </div>
    );
};

export default AdminPage;

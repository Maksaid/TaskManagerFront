import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AdminPageUsersAndRoles = () => {
    const orgId = localStorage.getItem('org_id');

    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');

    const [newUserRoleId, setNewUserRoleId] = useState('');
    const [userCreationError, setUserCreationErrorMessage] = useState('')
    // Fetch roles and users
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/Roles', {
                    params: {organization: orgId},
                });
                setRoles(response.data);
            } catch (err) {
                console.error('Error fetching roles:', err);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Organisation/Users', {
                    params: {organization: orgId},
                });
                setUsers(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchRoles();
        fetchUsers();
    }, [orgId]);

    // Add new role
    const handleAddRole = async () => {
        if (newRoleName.trim() === '') return;
        try {
            const response = await axios.post('https://localhost:7260/api/Role', {
                organizationId: orgId,
                roleName: newRoleName,
            });
            setRoles((prevRoles) => [...prevRoles, response.data]);
            setNewRoleName('');
        } catch (err) {
            console.error('Error adding role:', err);
        }
    };

    // Add new user
    const handleAddUser = async () => {
        if (newUserName.trim() === '' || newUserRoleId === '') return;
        try {
            const response = await axios.post('https://localhost:7260/api/Auth/Register', {
                fullName: newUserName,
                password: newUserPassword,
                email: newUserEmail,
                organizationId: orgId,
                roleId: newUserRoleId
            });
            setUsers((prevUsers) => [...prevUsers, response.data]);
            setNewUserName('');
            setNewUserRoleId('');
            setUserCreationErrorMessage('');
        } catch (err) {
            setUserCreationErrorMessage(err.response.data);
            console.error('Error adding user:', err);
        }
    };

    // Update user's role
    const handleUpdateUserRole = async (userId, roleId) => {
        // Find the user and create a new object with the updated roleId
        const userToUpdate = users.find((user) => user.id === userId);
        if (!userToUpdate) {
            console.error('User not found!');
            return;
        }

        const updatedUser = { ...userToUpdate, roleId }; // Create a new object with the updated roleId

        try {
            // Send the updated user object to the API
            await axios.put(`https://localhost:7260/api/User`, updatedUser);

            // Update the state
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? updatedUser : user))
            );

            console.log('User role updated successfully');
        } catch (err) {
            console.error('Error updating user role:', err);
        }
    };


    return (
        <div className="container mt-5">
            <h1>Admin Page</h1>

            {/* Roles Section */}
            <section>
                <h2>Roles</h2>
                <ul className="list-group mb-5">
                    {roles.map((role) => (
                        <li key={role.id} className="list-group-item">
                            {role.roleName}
                        </li>
                    ))}
                </ul>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="New Role Name"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        className="form-control"
                    />
                    <button className="btn btn-success mt-2" onClick={handleAddRole}>
                        Add Role
                    </button>
                </div>
            </section>

            {/* Users Section */}
            <section>
                <h2>Users</h2>
                <ul className="list-group">
                    {users.map((user) => (
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {user.fullName} -{' '}
                  {roles.find((role) => role.id === user.roleId)?.roleName || 'No Role Assigned'}
              </span>
                            <select
                                value={user.roleId || ''}
                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                className="form-select"
                                style={{width: '200px'}}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.roleName}
                                    </option>
                                ))}
                            </select>
                        </li>
                    ))}
                </ul>
                <br></br>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="New User Name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="New User email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="New User password"
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        className="form-control mb-2"
                    />
                    <select
                        className="form-control mb-2"
                        value={newUserRoleId}
                        onChange={(e) => setNewUserRoleId(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.roleName}
                            </option>
                        ))}
                    </select>
                    <p className="text-danger">{userCreationError}</p>
                    <button className="btn btn-success" onClick={handleAddUser}>
                        Add User
                    </button>
                </div>

            </section>
        </div>
    );
};

export default AdminPageUsersAndRoles;

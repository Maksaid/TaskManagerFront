import React from 'react';
import './NavBar.css'; // Optional: for styling
import {Link} from "react-router-dom";


const NavBar = () => {
    return (<>
            <nav className="navbar">
                <div className="nav-logo nav-button">
                    <p className="logo d-flex justify-content-center">Tasker's</p>
                </div>
                <div className="nav-buttons">
                    <Link className="nav-button text-decoration-none " to='/'>Home</Link>
                    <Link className="nav-button text-decoration-none " to='/tasks/none'>Tasks</Link>
                    <Link className="nav-button text-decoration-none " to='/profile'>Profile</Link>
                    <Link className="nav-button text-decoration-none " to='/admin_page'>Settings</Link>
                </div>
            </nav>
        </>

    );
};

export default NavBar;
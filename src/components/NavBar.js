import React from 'react';
import './NavBar.css'; // Optional: for styling
import {Link} from "react-router-dom";


const NavBar = () => {
    return (<>
            <nav className="navbar">
                <div className="nav-logo nav-button">
                    <p className="logo">Tasker's</p>
                </div>
                <div className="nav-buttons">
                    <Link className="nav-button" to='/'>Home</Link>
                    <Link className="nav-button" to='/profile'>Profile</Link>
                    <Link className="nav-button" to='/task'>Task</Link>
                </div>
            </nav>
        </>

    );
};

export default NavBar;
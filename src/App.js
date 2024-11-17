import React from 'react';
import NavBar from './components/NavBar.js';
import AppRoutes from './AppRoutes';
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
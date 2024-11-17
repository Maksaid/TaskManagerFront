import React from 'react';
import NavBar from './components/NavBar.js';
import AppRoutes from './AppRoutes';
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    );
};

export default App;
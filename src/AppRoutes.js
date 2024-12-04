import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Task from './components/Task';
import TaskDetail from "./components/TaskDetail";
import CreateTask from "./components/CreateTask";
import AdminPage from "./components/AdminPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/task" element={<Task/>}/>
            <Route path="/task/:taskId" element={<TaskDetail/>}/>
            <Route path="/project/:projectId" element={<TaskDetail/>}/>
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/admin_page" element={<AdminPage />} />
        </Routes>
    );
};

export default AppRoutes;

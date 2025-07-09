import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayouts;
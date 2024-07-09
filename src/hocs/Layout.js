import React from 'react';
import Navbar from '../components/Navbar';

const Layout = (props) => (
    <>
        <Navbar />
        {props.children}
    </>
);

export default Layout;

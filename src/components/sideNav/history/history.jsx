import React from 'react';
import Nav_bar from '../../Nav_bar/nav_bar';
import SideNav from '../sideNav';

const History = ({onSearch, clickToMain, authService}) => {
    return (
        <>
        <Nav_bar onSearch= {onSearch} clickToMain = {clickToMain} authService = {authService} />
        <SideNav clickToMain = {clickToMain}/>
         History!   
        </>
    );
};

export default History;
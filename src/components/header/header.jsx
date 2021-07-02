import React from 'react';
import logo from '../../images/logo.png'
import styles from './header.module.css';

const Header = ({onLogout}) => (
       <header className={styles.header}>
         {onLogout && (<button className={styles.logout} onClick={onLogout}>Logout</button>)}
         <img className={styles.logo} src={logo} alt="logo" />
         <h1 className={styles.title}>YouTube Clone Application</h1> 
       </header>    
    );

export default Header;
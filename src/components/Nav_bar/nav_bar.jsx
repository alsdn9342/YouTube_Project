import React, { Component, useRef } from 'react';
import styles from './nav_bar.module.css'


const Nav_bar = ({onSearch}) => {
    const inputRef = useRef();
    const handleSearch = () => {
       const value = inputRef.current.value;
       onSearch(value);
    };

    const onClick = () => {
      handleSearch();
    };

    const onKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
            <img className={styles.img} src="/images/logo.png" alt="logo" />
            <h1 className={styles.title}>YouTube</h1>
            </div>
            <input ref={inputRef} className={styles.input} type="search" placeholder ="Search" onKeyPress={onKeyPress} />
            <button className={styles.button} onClick={onClick}>
                <img className={styles.buttonImage} src="/images/search.png" alt="search" />
            </button>
        </header>
    )
};

export default Nav_bar;
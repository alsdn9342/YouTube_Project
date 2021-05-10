import React, { memo, useRef} from 'react';
import styles from './nav_bar.module.css'
import logo from '../../images/logo.png'
import search from '../../images/search.png'


const Nav_bar = memo(({onSearch, clickToMain}) => {
    const inputRef = useRef();
    const handleSearch = () => {
       const value = inputRef.current.value;
       clickToMain(null);
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

    const goBackToMain = () =>{
        clickToMain(null);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={goBackToMain} >
            <img className={styles.img}  src={logo} alt="logo" />
            <h1 className={styles.title}>YouTube</h1>
            </div>
            <input ref={inputRef} className={styles.input} type="search" placeholder ="Search" onKeyPress={onKeyPress} />
            <button className={styles.button} onClick={onClick}>
                <img className={styles.buttonImage} src={search} alt="search" />
            </button>
        </header>
    )
});

export default Nav_bar;
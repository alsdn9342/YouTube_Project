import React, { memo, useEffect, useRef} from 'react';
import styles from './nav_bar.module.css'
import logo from '../../images/logo.png'
import search from '../../images/search.png'
import { useHistory } from 'react-router-dom';


const Nav_bar = memo(({onSearch, clickToMain, authService}) => {
    const history = useHistory();
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

    const logout = () => {
        authService.logout();
    };

    //Alway re-render whenever any component is changed and it goes back to signin page.
    useEffect(() => {
        authService.onAuthChange(user => {
            if(!user) {
               history.push('/YouTube_Project');
            }
        });
    })

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
            <button className={styles.logout} onClick={() => {logout()}}>Logout</button>
        </header>
    )
});

export default Nav_bar;
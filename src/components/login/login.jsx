import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header'
import styles from './login.module.css'

const Login = ({authService}) => {
    const history = useHistory();

    const goToMaker = userId => {
        history.push({
            pathname:'/youtube',
            state: { id: userId} // insert uid for each login method, Google and Github.
        });
    };

    const onLogin = event => {
       authService
       .login(event.currentTarget.textContent)
       .then(data => goToMaker(data.user.uid)); 
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            user && goToMaker(user.uid);
        })

    });
    return (
        <section className={styles.login}>
        <h1>Header!</h1>
        <section>
            <h1>Login</h1>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button className={styles.button} onClick={onLogin}>Google</button>
                </li>
                <li className={styles.item}>
                    <button className={styles.button} onClick={onLogin}>Github</button>
                </li>
            </ul>
        </section>
        <h2>Footer!</h2>
    </section>
    );
};

export default Login;
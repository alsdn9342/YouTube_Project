import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header'
import styles from './login.module.css'

const Login = ({authService}) => {
    const history = useHistory();

    const goToYoutube = userId => {
        history.push({
            pathname:'/youtube',
            state: { id: userId} // insert uid for each login method, Google and Github.
        });
    };

    const onLogin = event => {
       authService
       .login(event.currentTarget.textContent)
       .then(data => goToYoutube(data.user.uid)); 
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            user && goToYoutube(user.uid);
        })

    });
    return (
        <section className={styles.login}>
        <Header />
        <section className={styles.mainBody}>
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
        <Footer />
    </section>
    );
};

export default Login;
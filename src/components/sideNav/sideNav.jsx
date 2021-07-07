import React from 'react';
import { useHistory } from 'react-router-dom';
import home from '../../images/home.png';
import library from '../../images/library.png';
import like from '../../images/like.png';
import styles from '../sideNav/sideNav.module.css';


const SideNav = ({clickToMain}) => {
    const history = useHistory();

    const goToHome = () => {
        clickToMain(null);
        history.push('/youtube');
    };

    const goToHistory = () => {
       
        history.push('/history');
    }
    
    return (
        <section className={styles.body}>
            <div className={styles.btns} onClick={() => {goToHome()}}>
               <img className={styles.homeImg} src={home} alt="home"/>
               <div className={styles.home}>Home</div>
            </div>
            <div className={styles.btns} onClick={() => {goToHistory()}}>
               <img className={styles.libImg} src={library} alt="library" />
               <div className={styles.lib}>Library</div>
            </div>
            <div className={styles.btns}>
            <img className={styles.likeImg} src={like} alt="like" />
            <div className={styles.like}>Like</div>
            </div>
        </section>
    );
};

export default SideNav;
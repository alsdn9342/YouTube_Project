import React from 'react';
import { useHistory } from 'react-router-dom';

const SideNav = ({clickToMain}) => {
    const history = useHistory();

    const goToHome = () => {
        clickToMain(null);
    };

    const goToHistory = () => {
        history.push('/history');
    }
    
    return (
        <section>
            <div>
               <button onClick={() => {goToHome()}} >Home</button>
            </div>
            <div>
               <button onClick={() => {goToHistory()}}>History</button> 
            </div>
            <div>
               <button>MyFavorite</button> 
            </div>
        </section>
    );
};

export default SideNav;
import React from 'react';
import { useHistory } from 'react-router-dom';

const SideNav = ({clickToMain}) => {
    const history = useHistory();

    const goToHome = () => {
        clickToMain(null);
    };
    
    return (
        <section>
            <div>
               <button onClick={() => {goToHome()}} >Home</button>
            </div>
            <div>
               <button>History</button> 
            </div>
            <div>
               <button>MyFavorite</button> 
            </div>
        </section>
    );
};

export default SideNav;
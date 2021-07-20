import React from 'react';
import History from '../sideNav/history/history';
import styles from './history_list.module.css'

const History_list = ({videoHistory, onVideoClick}) => (         
 
 <ul className = {styles.videos}>    
  {videoHistory[0].map(video => (
       <History key={video.id} video={video} onVideoClick={onVideoClick} /> 
     ))}
 </ul>
  );

export default History_list;
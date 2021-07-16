import React from 'react';
import styles from './video_detail.module.css'
const Video_detail = ({video}) => {
    

    return (
        <section className={styles.detail}>
        <iframe
        className={styles.video}  
        type="text/html"
        title="youtube video player" 
        width="100%" 
        height="700"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0" 
        allowFullScreen= "true">
        </iframe>
        <h2>
            {video.title}
        </h2>
        <h3>
            {video.channel_title}
        </h3>
        <pre className={styles.description}>{video.description}</pre>
    </section>
    );
    
    };

export default Video_detail;
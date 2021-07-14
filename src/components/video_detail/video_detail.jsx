import React from 'react';
import styles from './video_detail.module.css'
const Video_detail = ({video, video:{snippet}}) => (
    <section className={styles.detail}>
        <iframe
        className={styles.video}  
        type="text/html"
        title="youtube video player" 
        width="100%" 
        height="700"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0" 
        allowFullscreen= "true">
        </iframe>
        <h2>
            {video.snippet.title}
        </h2>
        <h3>
            {snippet.channelTitle}
        </h3>
        <pre className={styles.description}>{snippet.description}</pre>

    </section>
    );

export default Video_detail;
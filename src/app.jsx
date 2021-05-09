import React, { useCallback, useEffect, useState } from 'react';
import './app.module.css';
import Nav_bar from './components/Nav_bar/nav_bar';
import VideoList from './components/video_list/video_list';
import styles from './app.module.css';
import Video_detail from './components/video_detail/video_detail';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const selectVideo = (video) => {
    setSelectedVideo(video);
  }
  

  const search = useCallback(query => {
    youtube
    .search(query)
    .then(videos => setVideos(videos));
  },[]);
  
  const clickToMain = reset => {
    setSelectedVideo(reset);
  }

  useEffect(() => {
    youtube.mostPopular()
    .then(videos => setVideos(videos));
  }, [youtube]);


  return(
    <div className={styles.app}>
    <Nav_bar onSearch={search} clickToMain={clickToMain}/>
    <section className={styles.content}>
    {selectedVideo && (
    <div className={styles.detail}>
     <Video_detail video={selectedVideo} />
    </div>
    )}
    <div className={styles.list}>
    <VideoList videos={videos} onVideoClick ={selectVideo} display={selectedVideo ? 'list':'grid'} />
    </div>
    </section>
    </div>
  );
}

export default App;

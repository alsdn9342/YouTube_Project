import React, { useEffect, useState } from 'react';
import './app.module.css';
import Nav_bar from './components/Nav_bar/nav_bar';
import VideoList from './components/video_list/video_list';
import styles from './app.module.css';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const search = query => {
    youtube
    .search(query)
    .then(videos => setVideos(videos));
  }

  useEffect(() => {
    youtube.mostPopular()
    .then(videos => setVideos(videos));
  }, []);

  return(
    <div className="styles.app">
    <Nav_bar onSearch={search} />
    <VideoList videos={videos} />
    </div>
  );
}

export default App;

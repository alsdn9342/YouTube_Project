import React, { useCallback, useEffect, useState } from 'react';
import './app.module.css';
import Nav_bar from './components/Nav_bar/nav_bar';
import VideoList from './components/video_list/video_list';
import Login from './components/login/login';
import styles from './app.module.css';
import Video_detail from './components/video_detail/video_detail';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App({youtube, authService}) {
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
    <div className = {styles.app}>
      <BrowserRouter>
       <Switch>
         <Route exact path="/YouTube_Project">
           <Login authService = {authService} />
         </Route>
         <Route path="/youtube">
         <Nav_bar onSearch= {search} clickToMain = {clickToMain} authService = {authService} />
         <section className = {styles.content}>
          {selectedVideo && (
            <div className={styles.detail}>
              <Video_detail video={selectedVideo} />
            </div>
           )}
           <div className={styles.list}>
            <VideoList videos={videos} onVideoClick = {selectVideo} display={selectedVideo ? 'list':'grid'} />
           </div>
         </section>
         </Route>
       </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;

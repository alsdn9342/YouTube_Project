import React, { useCallback, useEffect, useState } from 'react';
import './app.module.css';
import Nav_bar from './components/Nav_bar/nav_bar';
import VideoList from './components/video_list/video_list';
import Login from './components/login/login';
import styles from './app.module.css';
import Video_detail from './components/video_detail/video_detail';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SideNav from './components/sideNav/sideNav';
import History from './components/sideNav/history/history';

function App({youtube, authService}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sideNav, setSideNav] = useState(Boolean);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  }

  const search = useCallback(query => {
    console.log(query);
    youtube
    .search(query)
    .then(videos => setVideos(videos));
  },[]);
  
  console.log(videos);
  const resetVideos = () => {
    youtube.mostPopular()
    .then(videos => setVideos(videos));
  }
  
  const clickToMain = reset => {
    setSelectedVideo(reset);
  }

  const clickSideNav = reset => {
    setSideNav(reset);
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
         <Nav_bar  resetVideos={resetVideos} onSearch= {search} clickToMain = {clickToMain} sideNav={sideNav} clickSideNav={clickSideNav} authService = {authService} style={{zIndex:2}}/>
         <section className = {styles.content}>
         {sideNav === true && <SideNav clickToMain = {clickToMain} resetVideos={resetVideos} />}
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
         <Route exact path="/history">
         <Nav_bar onSearch= {search} clickToMain = {clickToMain} sideNav={sideNav} clickSideNav={clickSideNav} authService = {authService} style={{zIndex:2}} />
         <section className = {styles.content}>
         {sideNav === true && <SideNav clickToMain = {clickToMain} resetVideos={resetVideos} />}
           <div >
            <History />
           </div>
         </section>
         </Route>
       </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;

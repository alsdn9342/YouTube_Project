import React, { useCallback, useEffect, useState } from 'react';
import './app.module.css';
import Nav_bar from './components/Nav_bar/nav_bar';
import VideoList from './components/video_list/video_list';
import Login from './components/login/login';
import styles from './app.module.css';
import Video_detail from './components/video_detail/video_detail';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SideNav from './components/sideNav/sideNav';
import Axios from 'axios';
import History_list from './components/history_list/history_list';
import {HighlightOffOutlinedIcon as DeleteBtn} from '@material-ui/icons/HighlightOffOutlined';

function App({youtube, authService}) {
  const [videos, setVideos] = useState([]);
  const [videoHistory, setVideoHistory] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedHistoryVideo, setSelectedHistoryVideo] = useState(null);
  const [sideNav, setSideNav] = useState(Boolean);

  const selectVideo = (video) => {
    setSelectedVideo(video);
    addVideoToHistory(video);
  }
  

  const selectHistoryVideo = (video) => {
    setSelectedHistoryVideo(video);
  }
  

  const addVideoToHistory = (selectedVideo) => {
   
    Axios.post("http://localhost:8091/api/add", {
      id : selectedVideo.id,
      thumnails_default: selectedVideo.snippet.thumbnails.default.url,
      channel_title: selectedVideo.snippet.channelTitle,
      thumnails_medium : selectedVideo.snippet.thumbnails.medium.url,
      title : selectedVideo.snippet.title,
      description : selectedVideo.snippet.description
    }).then(() => {
      setVideoHistory(selectedVideo);
      console.log('success');
    })
  }
 

  const search = useCallback(query => {
    youtube
    .search(query)
    .then(videos => setVideos(videos));
  },[]);
  
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


  useEffect(() => {
    fetch('http://localhost:8091/api/videos')
    .then(res => {
      return res.json()
    })
    .then(video => {
      setVideoHistory(video);
    })
  },[videoHistory]);


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
         {sideNav === true && <SideNav clickToMain = {clickToMain} resetVideos={resetVideos} selectHistoryVideo = {selectHistoryVideo} />}
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
         <Nav_bar resetVideos={resetVideos} onSearch= {search} clickToMain = {clickToMain} sideNav={sideNav} clickSideNav={clickSideNav} authService = {authService} style={{zIndex:2}} />
         <section className = {styles.content}>
         {sideNav === true && <SideNav clickToMain = {clickToMain} resetVideos={resetVideos} selectHistoryVideo = {selectHistoryVideo} />}
         {selectedHistoryVideo && (
            <div className={styles.detail}>
              <Video_detail video={selectedHistoryVideo} />
            </div>
           )}
           <div className={styles.list} >
            <History_list videoHistory={videoHistory} onVideoClick = {selectHistoryVideo} display={selectedVideo ? 'list':'grid'}/>
           </div>
         </section>
         </Route>
       </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;

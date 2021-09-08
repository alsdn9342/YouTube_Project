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
import { connect, useDispatch, useSelector } from 'react-redux';
import {setVideos_redux} from './actions'
import { Store } from '@material-ui/icons';


function App({youtube, authService}) {
  const dispatch = useDispatch();
  const videosRedux = useSelector(state => state.data.videos);
  const [videos, setVideos] = useState([]);
  const [videoHistory, setVideoHistory] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedHistoryVideo, setSelectedHistoryVideo] = useState(null);
  const [sideNav, setSideNav] = useState(Boolean);

 // console.log(videosRedux); 

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
      retrieveHistory();
      console.log('success');
    })
  }

  const deleteVideoInHistory = (selectedVideo) => {
   
     Axios.delete("http://localhost:8091/api/delete",{
      data: { 
        id: selectedVideo.id
      }
    }).then(() => {
      retrieveHistory();
      console.log('successfully deleted!');
     })
  }
 

  const search = useCallback(query => {
    youtube
    .search(query)
    .then(videos => {
      setVideos(videos)
      dispatch(setVideos_redux(videos))
    });
  },[]);
  
  const resetVideos = () => {
    youtube.mostPopular()
    .then(videos => {
      setVideos(videos)
      dispatch(setVideos_redux(videos))
    });
  }
  
  const clickToMain = reset => {
    setSelectedVideo(reset);
  }

  const clickSideNav = reset => {
    setSideNav(reset);
  }

  useEffect( async() => {
   await youtube.mostPopular()
    .then(videos => {
      setVideos(videos)
      console.log('render1')
      dispatch(setVideos_redux(videos)) 
      console.log('render2')
    });
    retrieveHistory()
  }, []);

  const retrieveHistory = async () => {
   await fetch('http://localhost:8091/api/videos')
    .then(res => {
      return res.json()
    })
    .then(video => {
      setVideoHistory(video);
    })
  }

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
            <History_list videoHistory={videoHistory} onVideoClick = {selectHistoryVideo} display={selectedVideo ? 'list':'grid'} deleteVideoInHistory={deleteVideoInHistory}/>
           </div>
         </section>
         </Route>
       </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './app.module.css';
import Nav_bar from './components/Nav_bar/nav_bar';
import VideoList from './components/video_list/video_list';
import styles from './app.module.css';

function App() {
  const [videos, setVideos] = useState([]);
  const search = query => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxresults=25&q=${query}&type=video&key=AIzaSyDSfx3ahDlVHxgqIqQVUgRJ3W1dPZQk08s`, requestOptions )
      .then(response => response.json())
      .then(result => result.items.map(item => ({...item, id:item.id.videoId})))
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyDSfx3ahDlVHxgqIqQVUgRJ3W1dPZQk08s',
      requestOptions
    )
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);
  return(
    <div className="styles.app">
    <Nav_bar onSearch={search} />
    <VideoList videos={videos} />
    </div>
  );
}

export default App;

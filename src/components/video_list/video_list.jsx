import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';
import { useSelector } from 'react-redux';
import store from '../../store/store';

const VideoList = ({videos, onVideoClick}) => {
   
  const reduxVideos = store.getState().data.videos;
     console.log(reduxVideos);
   // console.log(videos);
    return (
      <>
      <ul className = {styles.videos}>
      {reduxVideos.map(video => (
        <VideoItem key={video.id} video={video} onVideoClick={onVideoClick} />
      ))}
    </ul>
    </>
    )
  };


export default VideoList;
import {combineReducers} from 'redux';
import videoReducer from './videos'

const allReducers = combineReducers({
    setVideos: videoReducer
})

export default allReducers;
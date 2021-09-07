import {combineReducers} from 'redux';
import videoReducer from './videos'

const allReducers = combineReducers({
    videos: videoReducer
})

export default allReducers;
import {combineReducers} from 'redux';
import videoReducer from './videos'

const allReducers = combineReducers({
    data: videoReducer
})

export default allReducers;
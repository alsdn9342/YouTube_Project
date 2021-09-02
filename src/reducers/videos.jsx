const videoReducer = (state = null, action) => {
    switch(action.type){
        case 'SETVIDEOS':
            return action.payload
        default:
            return state;
    }
}

export default videoReducer;
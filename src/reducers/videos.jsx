const initialState = []

const videoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SETVIDEOS':
            return {...state, videos:action.payload}
        default:
            return state;
    }
}

export default videoReducer;
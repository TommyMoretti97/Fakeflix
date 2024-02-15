
import { ADD_MOVIE, REMOVE_MOVIE } from '../actions/Actions';

const initialState = {
    movieList: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE:
            return {
                ...state,
                movieList: [...state.movieList, action.payload]
            };
        case REMOVE_MOVIE:
            return {
                ...state,
                movieList: state.movieList.filter(movie => movie.id !== action.payload)
            };
        default:
            return state;
    }
};

export default rootReducer;
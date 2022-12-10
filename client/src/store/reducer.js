import {
    GET_VIDEOGAMES, GET_VIDEOGAMES_DETAIL, GET_GENRES
} from "./actions";


const initialState = {
    videogames: [],
    videogamesDetail: {},
    genres: []
};


function rootReducer(state = initialState, action) {

    if (action.type === GET_VIDEOGAMES) {
        return {
            ...state,
            videogames: action.payload,
        };
    };

    if (action.type === GET_VIDEOGAMES_DETAIL) {
        return {
            ...state,
            videogamesDetail: action.payload
        };
    };

    if (action.type === GET_GENRES) {
        return {
            ...state,
            genres: action.payload
        }
    };

};


export default rootReducer;
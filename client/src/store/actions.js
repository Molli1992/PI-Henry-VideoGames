export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_DETAIL = "GET_VIDEOGAMES_DETAIL";
export const GET_GENRES = "GET_GENRES";



export function getGames() {
    return function (dispatch) {
        return fetch("http://localhost:3001/videogames")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_VIDEOGAMES, payload: json });
            });
    };
};


export function getVideogamesDetail(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_VIDEOGAMES_DETAIL, payload: json });
            });
    };
};

export function getGenres() {
    return function (dispatch) {
        return fetch("http://localhost:3001/genres")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_GENRES, payload: json });
            });
    };
};
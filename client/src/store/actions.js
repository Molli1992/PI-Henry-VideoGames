export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_DETAIL = "GET_VIDEOGAMES_DETAIL";
export const GET_GENRES = "GET_GENRES";



export async function getGames() {
    return async function (dispatch) {
        return await fetch("http://localhost:3001/videogames")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_VIDEOGAMES, payload: json });
            });
    };
};


export async function getVideogamesDetail(id) {
    return async function (dispatch) {
        return await fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_VIDEOGAMES_DETAIL, payload: json });
            });
    };
};

export async function getGenres() {
    return async function (dispatch) {
        return await fetch("http://localhost:3001/genres")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_GENRES, payload: json });
            });
    };
};
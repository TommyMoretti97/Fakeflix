
export const ADD_MOVIE = 'ADD_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';

export const addMovie = (movie) => ({
    type: ADD_MOVIE,
    payload: movie
});

export const removeMovie = (movieId) => ({
    type: REMOVE_MOVIE,
    payload: movieId
});
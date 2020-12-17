const initialState = {
    movies: [],
    moviesList: [],
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_MOVIES':
            return {...state, movies: [...action.payload]};
        case 'ADD_LIST_PAGE': {
            const movie = state.movies.find(item => item.imdbID === action.payload);
            let moviesList = [...state.moviesList, movie];
            return {...state, moviesList};
        }
        default:
            return state;    
    }
}
 
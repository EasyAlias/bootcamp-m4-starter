const initialState = {
    movies: [],
    moviesList: [],
    titleList: '',
    error: '',
    
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
        case 'GET_ERROR': {
            return {...state, error: "Введите правильное название фильма"};
        }
        case 'DELETE_MOVIE': {
            const myMoviesList = state.moviesList.filter(item => item.imdbID !== action.payload);
            const moviesList = [...myMoviesList];
            return {...state, moviesList};
        }
        case 'CHANGE_TITLE_LIST': {
            const titleList = action.payload;
            return {...state, titleList};
        }
        default:
            return state;    
    }
}
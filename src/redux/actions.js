export function getData (name) {
    return (dispatch) => {
        fetch(`http://www.omdbapi.com/?s=${name}&apikey=bcfe2844`)
        .then(res => res.json())
        .then(data => {
            dispatch(getMovies(data.Search))
        })
    }
}

const getMovies = (payload) => {
    return {
        type: 'GET_MOVIES',
        payload,
    }
}

export const getIdMovies = (payload) => {
    return {
        type:'ADD_LIST_PAGE',
        payload,
    }
}
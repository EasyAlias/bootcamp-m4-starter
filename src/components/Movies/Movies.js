import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import {connect} from 'react-redux';
import './Movies.css';

class Movies extends Component {
    render() { 
        return ( 
            <ul className="movies">
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} disabled={this.props.moviesList.find(el => el.imdbID === movie.imdbID)}/>
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default connect( state => ({movies: state.movies, moviesList: state.moviesList}))(Movies);
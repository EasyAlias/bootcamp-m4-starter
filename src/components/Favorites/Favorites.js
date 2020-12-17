import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: 'Супер список',
        // movies: [
        //     { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
        // ]
    }
    render() { 
        return (
            <div className="favorites">
                <input value={this.state.title} className="favorites__name" />
                <ul className="favorites__list">
                    {this.props.moviesList.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year})</li>;
                    })}
                </ul>
                <button type="button" className="favorites__save">Сохранить список</button>
            </div>
        );
    }
}
 
export default connect (state => ({moviesList: state.moviesList})) (Favorites);
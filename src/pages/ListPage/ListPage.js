import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ListPage.css';

class ListPage extends Component {
    state = {
        title: '',
        movies: [],
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ 
                        title: data.title
                    })          
                    data.movies.forEach(el => {
                        fetch(`http://www.omdbapi.com/?i=${el}&apikey=bcfe2844`) 
                        .then(res => res.json()) 
                        .then(dataMovies => {
                            this.setState({
                                movies: [...this.state.movies, dataMovies],
                            })
                        })        
                    });
            })
    }
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    
    render() { 
        return (
            <div className="list-page">
                <div className="list-page__title">
                    <h1 className="list-page__title_h1">{this.state.title}</h1>
                </div>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <a href={`https://www.imdb.com/title/${item.imdbID}`} target="_blank">
                                <li className="list__movie-item" key={item.imdbID}>
                                    <img className="list__movie-item__poster" src={item.Poster} alt={item.Title} />
                                    <div className="list__movie-item__info">
                                        <h3 className="list__movie-item__title">{item.Title}&nbsp;({item.Year})</h3>
                                        <p>{item.Plot}</p>
                                    </div>
                                </li>
                            </a>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default connect (state => ({moviesList: state.moviesList, titleList: state.titleList}))(ListPage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteMovie} from './../../redux/actions';
import {changeTitleList} from './../../redux/actions';
import { Link } from 'react-router-dom';

import './Favorites.css';


class Favorites extends Component {
    state = {
        title: 'Сохранить список',
        disabled: false,
        link: '',
    }

        clickHandler = (event) => {
            if(event.target.innerText === 'Сохранить список') {
                this.setState ({ 
                    disabled: true,
                })
            fetch('https://acb-api.algoritmika.org/api/movies/list', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "title": this.props.titleList,
                    "movies": this.props.moviesList.map(el => el.imdbID)
                })  
            })
                .then(res => res.json())
                .then(data => { 
                    this.setState({ 
                        link: data.id
                    });
                })  
            } 
        }     
    
    render() {   
        return (
            <div className="favorites">
                <input type="text" 
                className="favorites__name" 
                placeholder="Новый список" 
                onChange={(event) => this.props.dispatch(changeTitleList(event.target.value)) } 
                disabled={this.state.disabled} />
                <ul className="favorites__list">
                    {this.props.moviesList.map((item) => {
                        const imb = item.imdbID;
                        return (
                        <li className="favorites__li"
                        key={imb}>
                        <button 
                        className='button_delete'
                        onClick={()=>this.props.dispatch(deleteMovie(imb))}>X</button>
                        {item.Title} ({item.Year})</li>
                    )})}
                </ul>
                {this.state.link ? (<Link to={`/list/${this.state.link}`}
                        className="favorites__save button_href_list">Перейти к списку: {this.props.titleList}</Link>) :
                        (<button 
                        type="button" 
                        className="favorites__save"
                        onClick={this.clickHandler}>
                            {this.state.title}</button>)}
            </div>
        );
    }
}
 
export default connect (state => ({moviesList: state.moviesList, titleList: state.titleList})) (Favorites);
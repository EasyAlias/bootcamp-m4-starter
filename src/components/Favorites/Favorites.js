import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteMovie} from './../../redux/actions';
import {changeTitleList} from './../../redux/actions';
import { Route, Link } from 'react-router-dom';
import ListPage from './../../pages/ListPage/ListPage';
import store from './../../redux/store';

import './Favorites.css';


class Favorites extends Component {
    state = {
        title: 'Сохранить список',
        disabled: false,
    }

    clickHandler = event => {
        if(event.target.innerText === 'Сохранить список') {
            this.setState ({ 
                title: <Link to='/list'className="button_href_list">Перейти к списку: {this.state.titleList}</Link>,
                disabled: true,
            })
        }
    }

    changeHandler = event =>{
        store.dispatch({
            titleList: event.target.value,
        })
    }

    render() { 
        console.log(this.props.titleList)    
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
                <button 
                type="button" 
                className="favorites__save"
                onClick={this.clickHandler}>
                    {this.state.title}</button>
                <Route path="/list">
                    <ListPage />
                </Route>
            </div>
        );
    }
}
 
export default connect (state => ({moviesList: state.moviesList, titleList: state.titleList})) (Favorites);
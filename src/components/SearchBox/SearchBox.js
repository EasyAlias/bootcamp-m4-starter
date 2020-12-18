import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getData } from './../../redux/actions';
import Search from './../../img/icon-search.png';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: '',
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }
    render() {
        const { searchLine } = this.state;     
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={() =>this.props.getData(searchLine)}
                    >
                        Искать
                    </button>
                        <img 
                        className="search-box__form-submit__icon"
                        disabled={!searchLine}
                        onClick={() =>this.props.getData(searchLine)}
                        src={Search} alt="search" 
                        />
                </form>
                <p className="error">{this.props.error}</p>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    getData: (searchLine) => dispatch(getData(searchLine))
})

 
export default connect ((state) => ({error: state.error}), mapDispatchToProps)(SearchBox);
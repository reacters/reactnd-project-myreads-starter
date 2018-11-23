import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import CircularIndeterminate from '../Spinner/Spinner'


function Search(props){


    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className={'close-search'}></Link>
        <div className="search-books-input-wrapper">
          <input type="text" onChange={props.changed} placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.loading ? <CircularIndeterminate/> : props.books}
        </ol>
      </div>
    </div>
    )
}

export default Search;
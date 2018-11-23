import React, { Component } from 'react';
import AppTitle from '../AppTitle/AppTitle'
import Bookshelf from '../Bookshelf/Bookshelf';
import * as BooksAPI from '../../BooksAPI';
import {Link} from 'react-router-dom';


function Home(props) {


    return (
      <div className="list-books">
      <AppTitle title="My Reads" />
        <div className="list-books-content">
          <div>
            <Bookshelf shelfTitle="Currently Reading" books={props.books.currentlyReadingBooks} changed={props.changed} />
            <Bookshelf shelfTitle="Want To Read" books={props.books.wantToReadBooks} changed={props.changed} />
            <Bookshelf shelfTitle="Read" books={props.books.alreadyReadBooks} changed={props.changed} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'></Link>
        </div>
      </div>
    )
  }

export default Home;

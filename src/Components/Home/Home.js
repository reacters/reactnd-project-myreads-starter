import React, { Component } from 'react';
import AppTitle from '../AppTitle/AppTitle'
import Bookshelf from '../Bookshelf/Bookshelf';
import * as BooksAPI from '../../BooksAPI';
import {Link} from 'react-router-dom';


class Home extends Component {

  state = {
    allBooks:[],
    currentlyReadingBooks:[],
    wantToReadBooks: [],
    alreadyReadBooks: [],
    showSearchPage: false
  }

  // LifeCycle Hooks
  componentWillMount(){
    // console.log("inside component did mount");
    BooksAPI.getAll().then(data => {
      // console.log(data);
      let allBooks,currentlyReadingBooks, alreadyReadBooks,wantToReadBooks;
      allBooks = data;
      currentlyReadingBooks = allBooks.filter(book => book.shelf === 'currentlyReading');
      wantToReadBooks = allBooks.filter(book => book.shelf === 'wantToRead');
      alreadyReadBooks = allBooks.filter(book => book.shelf === 'read');

      this.setState({
        allBooks: allBooks,
        currentlyReadingBooks: currentlyReadingBooks,
        wantToReadBooks: wantToReadBooks,
        alreadyReadBooks: alreadyReadBooks
      })
    });
  }
  handleChange = (id,book,e) => {
    let selectedvalue = e.target.value;
    let allBooks = [...this.state.allBooks];

    allBooks.forEach(book => {
        if(book.id === id){
          book.shelf = selectedvalue;
          BooksAPI.update(book, selectedvalue);
        }
    });

    let currentlyReadingBooks = allBooks.filter(book => book.shelf === 'currentlyReading');
    let wantToReadBooks = allBooks.filter(book => book.shelf === 'wantToRead');
    let alreadyReadBooks = allBooks.filter(book => book.shelf === 'read');

    this.setState({
      allBooks,
      currentlyReadingBooks,
      wantToReadBooks,
      alreadyReadBooks
    })
  }
  render() {
    return (
      <div className="list-books">
      <AppTitle title="My Reads" />
        <div className="list-books-content">
          <div>
            <Bookshelf shelfTitle="Currently Reading" books={this.state.currentlyReadingBooks} changed={this.handleChange.bind(this)} />
            <Bookshelf shelfTitle="Want To Read" books={this.state.wantToReadBooks} changed={this.handleChange.bind(this)} />
            <Bookshelf shelfTitle="Read" books={this.state.alreadyReadBooks} changed={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="open-search">
          {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
          <Link to='/search'></Link>
        </div>
      </div>
    )
  }
}

export default Home;

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import MoveButton from './Components/MoveButton/MoveButton';
import AppTitle from './Components/AppTitle/AppTitle';
import Bookshelf from './Components/Bookself/Bookself';

class BooksApp extends React.Component {
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
  handleChange = (id,e) => {
    let selectedvalue = e.target.value;
    console.log(selectedvalue);
    console.log(id);
    let allBooks = [...this.state.allBooks];


    allBooks.map(book => {
      if(book.id == id){
        book.shelf = selectedvalue
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

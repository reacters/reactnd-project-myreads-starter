import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './Components/ListBooks'
import SearchBooks from './Components/SearchBooks';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReading:[],
    wantToRead: [],
    read:[],

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  // All lifecycle hooks
  componentDidMount() {
    let allBooks=[],currentlyReading=[],wantToRead=[],read=[];
    BooksAPI.getAll()
      .then((data) => {
        allBooks = [...data];
        console.log('list of allBooks',allBooks)
        currentlyReading = allBooks.filter(book => book.shelf === 'wantToRead');
        console.log(currentlyReading);
    })
  }
  render() {
    return (
      <div className="app">
         {this.state.showSearchPage ? ( <SearchBooks /> ) : ( <ListBooks /> )}
      </div>
    )
  }
}

export default BooksApp

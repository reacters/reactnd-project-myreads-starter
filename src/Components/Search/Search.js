import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Book/Book';

class Search extends Component{
  state = {
    books: []
  }

  changed = (id,book,e) => {
    let selectedValue = e.target.value;
    console.log(`${book} with ${id} has been changed`);
    BooksAPI.update(book, selectedValue);
  }

  searchHandler = (e) => {
    let searchQuery = e.target.value;
    let books = [];
    if(searchQuery){
      BooksAPI.search(e.target.value)
      .then(results => {
        console.log(results);

        if(results.constructor === Array){
          books = results.map(book => {
            return <Book key={book.id} id={book.id} book={book}  title={book.title} author={book.authors} image={book.imageLinks} changed={this.changed}  />
          })
          this.setState({
            books
          })
        }else{
          books="No matches found";
          this.setState({
            books
          })
        }

      })

    }else{
      books = "Please type in the input box to search";
      this.setState({
        books
      })
    }


  }

  render(){
    return(
      <div className="search-books">
      <div className="search-books-bar">
        {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
        <Link to="/" className={'close-search'}></Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" onChange={this.searchHandler} placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books}

        </ol>
      </div>
    </div>
    )
  }
}

export default Search;
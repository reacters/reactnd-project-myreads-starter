import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Book/Book';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import PaperSheet from '../ErrorMsg/ErrorMsg';
import CircularIndeterminate from '../Spinner/Spinner'


const searchAPIDebounced = AwesomeDebouncePromise(BooksAPI.search, 500);
class Search extends Component{
  state = {
    books: [],
    loading: false
  }

  changed = (id,book,e) => {
    let selectedValue = e.target.value;
    console.log(`${book} with ${id} has been changed`);
    BooksAPI.update(book, selectedValue);
  }

  searchHandler = async (e) => {
    this.setState({loading: true});
    let searchQuery = e.target.value;
    let books = [];
      const results = await searchAPIDebounced(searchQuery, 300);
      if(results){
        this.setState({loading: false})
        if(results.constructor === Array){
          books = results.map(book => {
            return <Book 
                      key={book.id} 
                      id={book.id} 
                      book={book}  
                      title={book.title} 
                      author={book.authors} 
                      image={book.imageLinks} 
                      changed={this.changed}  
                    />
          })
          this.setState({books})
        }else{
          books=<PaperSheet/>;
          this.setState({books})
        }
      }else{
        this.setState({loading: false})
        books = <PaperSheet/>;
        this.setState({books})
      }
  }

  render(){
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className={'close-search'}></Link>
        <div className="search-books-input-wrapper">
          <input type="text" onChange={this.searchHandler} placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.loading ? <CircularIndeterminate/> : this.state.books}
        </ol>
      </div>
    </div>
    )
  }
}

export default Search;
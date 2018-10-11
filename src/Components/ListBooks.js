import React from 'react';
import BookShelf from './BookShelf';

const ListBooks = () => {
  return (
   
       <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
               <BookShelf/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
   
  )
}
export default ListBooks;
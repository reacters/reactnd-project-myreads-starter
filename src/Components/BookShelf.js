import React from 'react';
import Books from './Books'

 const BookShelf = (props) => {
  return (
    <div>
       <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        <Books />
                      </li>
                      <li>
                      <Books />
                     
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                      <Books />
                     
                      </li>
                      <li>
                      <Books />
                    
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                      <Books />
                       
                      </li>
                      <li>
                      <Books />
                    
                      </li>
                      <li>
                      <Books />
                       
                      </li>
                    </ol>
                  </div>
                </div>
    </div>
  )
}
export default BookShelf;

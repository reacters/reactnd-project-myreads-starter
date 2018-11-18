import React from 'react';
import Book from '../Book/Book';
import MoveButton from '../MoveButton/MoveButton' ;
import Spinner from '../Spinner/Spinner';

const bookshelf = (props) => {
  let data;
  data = <Spinner />;
  if(props.books){

     data = props.books.map(book => {
      return <Book key={book.id} id={book.id} title={book.title} author={book.authors} image={book.imageLinks} changed={props.changed} book={book} />
    })
  }

  return (
    <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      { data}

                    </ol>
                  </div>
                </div>

  )
}

export default bookshelf;
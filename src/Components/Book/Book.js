import React from 'react';
import MoveButton from '../MoveButton/MoveButton' ;

const Book = (props) => {
  let test = `url("${props.image.smallThumbnail}")`;
  return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: test }}></div>
            <MoveButton />

          </div>
          <div className="book-title">{props.title}</div>
          <div className="book-authors">{props.author}</div>
        </div>
      </li>
  )
}

export default Book

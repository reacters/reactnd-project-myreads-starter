import React from 'react';
import MoveButton from '../MoveButton/MoveButton' ;

const Book = (props) => {
  let test = '';
  if(props.image){
    test = `url("${props.image.smallThumbnail}")`;;

  }
  // console.log(props.shelf);
  // console.log(props.book);
  // console.log(props.id);
  return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: test }}></div>
              <MoveButton
                changed={props.changed}
                id={props.id}
                book={props.book}
                shelf={props.shelf}
              />
          </div>
          <div className="book-title">{props.title}</div>
          <div className="book-authors">{props.author}</div>
        </div>
      </li>
  )
}

export default Book

import React from 'react';

const MoveButton = (props) => {
  return(
      <div className="book-shelf-changer">
        <select onChange={props.changed.bind(this, props.id, props.book)}>
          <option value="move"  defaultValue>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
  )
}

export default MoveButton;
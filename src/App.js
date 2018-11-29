import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import * as BooksAPI from './BooksAPI';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import PaperSheet from './Components/ErrorMsg/ErrorMsg';
import Book from  './Components/Book/Book';


const searchAPIDebounced = AwesomeDebouncePromise(BooksAPI.search, 500);



class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReadingBooks:[],
    wantToReadBooks: [],
    alreadyReadBooks: [],
    showSearchPage: false,
    books: [],
    loading: false
  }
  componentWillMount(){
    // console.log("inside component did mount");
    BooksAPI.getAll().then(data => {
      // console.log(data);
      let allBooks,currentlyReadingBooks, alreadyReadBooks,wantToReadBooks;
      allBooks = data;
      currentlyReadingBooks = allBooks.filter(book => book.shelf === 'currentlyReading');
      wantToReadBooks = allBooks.filter(book => book.shelf === 'wantToRead');
      alreadyReadBooks = allBooks.filter(book => book.shelf === 'read');
      console.log("Inside home js ", currentlyReadingBooks);

      this.setState({
        allBooks: allBooks,
        currentlyReadingBooks: currentlyReadingBooks,
        wantToReadBooks: wantToReadBooks,
        alreadyReadBooks: alreadyReadBooks
      })
    });
  }
  componentDidUpdate(prevProps, prevState){
    console.log("this is getting executed ",prevState);
    BooksAPI.getAll().then(data => {
      // console.log(data);
      let allBooks,currentlyReadingBooks, alreadyReadBooks,wantToReadBooks;
      allBooks = data;
      currentlyReadingBooks = allBooks.filter(book => book.shelf === 'currentlyReading');
      wantToReadBooks = allBooks.filter(book => book.shelf === 'wantToRead');
      alreadyReadBooks = allBooks.filter(book => book.shelf === 'read');
      console.log("Inside home js ", currentlyReadingBooks);

      if(prevState.currentlyReadingBooks.length !== currentlyReadingBooks.length ||
         prevState.wantToReadBooks.length !== wantToReadBooks.length ||
         prevState.alreadyReadBooks.length !== alreadyReadBooks.length
        ){
          this.setState({
            allBooks: allBooks,
            currentlyReadingBooks: currentlyReadingBooks,
            wantToReadBooks: wantToReadBooks,
            alreadyReadBooks: alreadyReadBooks
          })
        }


    });
  }

  handleChange = (id,book,e) => {
    let selectedvalue = e.target.value;
    let allBooks = [...this.state.allBooks];

    allBooks.forEach(book => {
        if(book.id === id){
          book.shelf = selectedvalue;
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

  // Search Page handlers
  changed = (id,book,e) => {
    let selectedValue = e.target.value;
    console.log(`${book} with ${id} has been changed`);
    console.log(book.shelf);
    BooksAPI.update(book, selectedValue);
    console.log(book.shelf);
  }

  searchHandler = async (e) => {
    this.setState({loading: true});
    let searchQuery = e.target.value;
    let books = [];
      const results = await searchAPIDebounced(searchQuery, 300);
      if(results){
        this.setState({loading: false});
        if(results.constructor === Array){
          console.log(results);
          console.log("All books are", this.state.allBooks);


            books = results.map((result) => {
              // if(result.id)
              let i = this.state.allBooks.findIndex(book => book.id == result.id);
              if(i == -1){
                result.shelf = 'none';
              }else{
                let book = this.state.allBooks[i];
                result.shelf = book.shelf;
              }


                return <Book
                  book={result}
                  key={result.id}
                  id={result.id}
                  shelf={result.shelf}
                  title={result.title}
                  author={result.authors}
                  image={result.imageLinks}
                  changed={this.changed}
                />
              })



          console.log('books are  ', books);
          this.setState({books});


          // this.setState({books})
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




  render() {
    return (
      <div className="app">
      <Switch>
        <Route exact path='/' render={() => <Home books={this.state} changed={this.handleChange.bind(this)} />} />
        <Route  path='/search' render={() => <Search allBooks={this.state.allBooks} changed={this.searchHandler.bind(this)} books={this.state.books} />} />
      </Switch>



      </div>
    )
  }
}

export default BooksApp

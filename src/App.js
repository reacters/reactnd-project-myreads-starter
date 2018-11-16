import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';


class BooksApp extends React.Component {


  render() {
    return (
      <div className="app">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route  path='/search' component={Search} />
      </Switch>



      </div>
    )
  }
}

export default BooksApp

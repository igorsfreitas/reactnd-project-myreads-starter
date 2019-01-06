import React from 'react'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    userBooks: []
  }

  populateBooksList(books){
    this.setState(()=>{
      return {userBooks: books} 
    })
  }

  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route path="/search" render={()=>{
              return(
                <div>
                  <SearchBooks 
                    userBooks={this.state.userBooks}
                  />
                </div>
              )
            }} />
            <Route exact path="/" render={()=>{
              return(
                <div>
                  <ListBooks populateBooksList={this.populateBooksList.bind(this)} />
                </div>
              )
            }} />
            
          </div>
          
        </Router>
        
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooksResult from './SearchBooksResult'
import Loading from './components/Loading'
import { Link, withRouter } from "react-router-dom";

class SearchBooks extends React.Component {

    state = {
        loading: false,
        books: [],
        userBooks: []
    }

    getAllUserBooks(){
        if(this.props.userBooks && this.props.userBooks.length>0){
            this.setState(()=>{
                return {userBooks: this.props.userBooks, loading: false}
            })
        }else{
            BooksAPI.getAll().then(books=>{
                this.setState(()=>{
                    return {userBooks: books, loading: false}
                })
            })
        }
    }

    componentDidMount(){
        this.getAllUserBooks()
    }

    searchBooks(searchWords){
        BooksAPI.search(searchWords).then(books=>{
            this.setState(()=>{
              return {books: books, loading: false}
            })
        })
    }

    handleSelect(shelf, book) {
        this.setState(()=>{
            return {loading: true}
        })
        BooksAPI.update(book, shelf).then(books=>{
            console.log(`Livro ${book.title} movido com sucesso para a estante ${shelf}`)
            this.props.history.push("/");
        },err=>{
            this.setState(()=>{
                return {loading: false}
            })
        }) 
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" onChange={(e)=>this.searchBooks(e.target.value)} placeholder="Search by title or author"/>
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.loading ? <Loading /> : 
                            this.state.books && this.state.books.length > 0 ? 
                                <SearchBooksResult 
                                    books={this.state.books} 
                                    handleSelect={this.handleSelect.bind(this)} 
                                    userBooks={this.state.userBooks} /> : 
                                "No books found for this search"
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBooks)
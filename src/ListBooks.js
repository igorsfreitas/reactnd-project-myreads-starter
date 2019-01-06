import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Loading from './components/Loading'
import { Link } from "react-router-dom";

class ListBooks extends React.Component {

    state = {
        loading: true,
        books: []
    }

    getAllBooks(){
        BooksAPI.getAll().then(books=>{
            this.setState(()=>{
              return {books: books, loading: false}
            })
            this.props.populateBooksList(books)
        })
    }

    componentDidMount(){
        this.getAllBooks()
    }

    handleSelect(shelf, book) {
        this.setState(()=>{
            return {loading: true}
        })
        BooksAPI.update(book, shelf).then(books=>{
            console.log(`Livro ${book.title} movido com sucesso para a estante ${shelf}`)
            this.getAllBooks()
        },err=>{
            this.setState(()=>{
                return {loading: false}
            })
        }) 
    }

    renderBookShelf(){
        let shelfs = this.state.books.map(book=>book.shelf)
        shelfs = shelfs.filter((current, index)=>shelfs.indexOf(current)===index)

        return (
            shelfs.map(shelf=>(
                <BookShelf 
                    key={shelf}
                    bookShelfTitle={shelf} 
                    bookShelfList={shelfs}
                    books={this.state.books.filter(book=>book.shelf === shelf)}
                    handleSelect={this.handleSelect.bind(this)} />  
            ))
        )
    }

    render(){
        return(
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {this.state.loading ? <Loading /> : this.state.books.length > 0 ? this.renderBookShelf() : "Não existem livros na estante"}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                    <button >Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ListBooks
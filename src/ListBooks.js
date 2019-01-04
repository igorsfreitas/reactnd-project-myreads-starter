import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Loading from './components/Loading'

class ListBooks extends React.Component {

    state = {
        loading: true,
        books: []
    }

    componentDidMount(){
        // this.setState({books = BooksAPI.getAll()})
        BooksAPI.getAll().then(books=>{
          this.setState(()=>{
            return {books: books, loading: false}
          })
        })
    }

    renderBookShelf(){
        let shelfs = this.state.books.map(book=>book.shelf)
        shelfs = shelfs.filter((current, index)=>shelfs.indexOf(current)===index)

        return (
            shelfs.map(shelf=>(
                <BookShelf 
                    bookShelfTitle={shelf} 
                    books={this.state.books.filter(book=>book.shelf === shelf)} />  
            ))
        )
    }

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.state.loading ? <Loading /> : this.state.books.length > 0 ? this.renderBookShelf() : "Não existem livros na estante"}
                </div>
            </div>
        )
    }
}

export default ListBooks
import React from 'react'
import fromCamelCaseToRegularForm from './utils/fromCamelCaseToRegularForm';

class BookShelf extends React.Component {

    renderBookShelf(){
        return this.props.books.map(book=>{
            return(
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                            <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map(author=>{
                                return (
                                    <div className="book-authors" key={author}>{author}</div>
                                )
                            })
                        }
                        
                    </div>
                </li>
            )
        })
    }

    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{fromCamelCaseToRegularForm(this.props.bookShelfTitle)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.renderBookShelf()}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf
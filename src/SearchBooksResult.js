import React from 'react'
import fromCamelCaseToRegularForm from './utils/fromCamelCaseToRegularForm'

class SearchBooksResult extends React.Component {

    searchUserBook(book){
        let filteredBooks = this.props.userBooks.filter(userBook=>{
            return userBook.id === book.id
        })
        return filteredBooks
    }

    isNotBookOnUserShelf(book){
        let filteredBooks = this.searchUserBook(book)
        return !(filteredBooks && filteredBooks.length > 0)
    }

    isSelectedShelfOption(book, shelfOption){
        let filteredBooks = this.searchUserBook(book)
        return filteredBooks && filteredBooks.length > 0 && filteredBooks[0].shelf === shelfOption
    }

    renderShelfOptions(book){
        let shelfs = this.props.userBooks.map(book=>book.shelf)
        shelfs = shelfs.filter((current, index)=>shelfs.indexOf(current)===index)
        let shelfOptions = shelfs.map(shelfOption=>{
            return (
                <option key={shelfOption} value={shelfOption} selected={this.isSelectedShelfOption(book, shelfOption)}>{fromCamelCaseToRegularForm(shelfOption)}</option>
            )
        })
        shelfOptions.push(<option value="none" key={`noneShelf${book.title}`} selected={this.isNotBookOnUserShelf(book)} >None</option>)
        return shelfOptions.map(shelfOption=>{
            return (
                shelfOption
            )
        })
    }
  
    render(){
        return this.props.books.map(book=>{
            return(
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book && book.imageLinks ? book.imageLinks.smallThumbnail : null})` }}></div>
                            <div className="book-shelf-changer">
                            {<select onChange={(e)=>this.props.handleSelect(e.target.value, book)}>
                                <option value="move" disabled>Move to...</option>
                                {this.renderShelfOptions(book)}
                            </select> }
                            </div>
                        </div>
                        <div className="book-title">{book && book.title ? book.title : "Invalid title"}</div>
                        {book && book.authors ? book.authors.map(author=>{
                                return (
                                    <div className="book-authors" key={author}>{author}</div>
                                )
                            }) : null
                        }
                        
                    </div>
                </li>
            )
        })
    }
}

export default SearchBooksResult
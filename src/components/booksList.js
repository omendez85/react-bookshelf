import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    urlImg(url) {
        return (url && url.smallThumbnail) ? url.smallThumbnail.replace( /^https?:/ ,'') : '/img/No_Image_Available.png';
    }

    listAuthors(authors) {
        return ( authors && authors.length > 0) ? authors.map( (author, i) => <span className="author" key={i}>{author}</span> ) : '';
    }

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map((book, i) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ backgroundImage: `url(${ this.urlImg(book.imageLinks) })` }}></div>
                                <div className="book-shelf-changer">
                                    <select
                                        onChange={ (event) => this.props.onChangeBooksAction(event.target.value, book) }
                                        value={ (book.shelf) ? book.shelf : 'none'}
                                    >
                                        <option value="none" disabled>
                                                {  (this.props.addBookText) ? `Add to` : `Move to` }
                                                ...
                                        </option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{ book.title }</div>
                            <div className="book-authors">{ this.listAuthors(book.authors) }</div>
                            <div className="book-moreinfo">
                                <a
                                    href="#"
                                    onClick={ () => { this.props.onShowMoreInfoBook(book) } }
                                >
                                    More info
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default ListBooks

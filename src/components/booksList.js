import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map((book, i) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${book.imageLinks.smallThumbnail} )` }}></div>
                                <div className="book-shelf-changer">
                                    <select
                                        onChange={ (event) => this.props.onChangeBooksAction(event.target.value, book) }
                                        value={book.shelf}
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
                            <div className="book-authors">{ book.author }</div>
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

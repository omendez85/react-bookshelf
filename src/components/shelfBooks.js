import React, { Component } from 'react';
import BooksList from './booksList'
import PropTypes from 'prop-types'

class ListBooksShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    getShelfCategories = () => {
        const shelfs = [];
        this.props.books.map( (book) => {
            return ( shelfs.indexOf(book.shelf) > -1 ) ? false : shelfs.push(book.shelf);
        });
        return shelfs.sort();
    }

    formatNameShelf = (shelfName) => {
        return shelfName.replace(/([A-Z]+)/g, " $1");
    }

    getBooksListShelf = (shelf) => {
        return this.props.books.filter( (book) => book.shelf === shelf );
    }

    render() {
        const shelfs = this.getShelfCategories();
        return (
            <div>
                {shelfs.map((shelf) => (
                    <div className="bookshelf" key={shelf}>
                      <h2 className="bookshelf-title">{ this.formatNameShelf(shelf) }</h2>
                      <div className="bookshelf-books">
                            <BooksList
                                books={ this.getBooksListShelf(shelf) }
                                shelf={ shelf }
                                onChangeBooksShelfCategory={ this.props.updateBookShelfCategory }
                            />
                      </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListBooksShelf

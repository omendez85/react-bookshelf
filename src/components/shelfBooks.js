import React, { Component } from 'react';
import BooksList from './booksList';
import PropTypes from 'prop-types';

class ListBooksShelf extends Component {
    static propTypes = {
        shelfs: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                {this.props.shelfs.map((shelf) => (
                    <div className="bookshelf" key={shelf.id}>
                      <h2 className="bookshelf-title">{ shelf.name }</h2>
                      <div className="bookshelf-books">
                            <BooksList
                                books={ shelf.books }
                                onChangeBooksAction={ this.props.updateBookShelfCategory }

                                onShowMoreInfoBook={this.props.onShowMoreInfoBook}
                            />
                      </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListBooksShelf;

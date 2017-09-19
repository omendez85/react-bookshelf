import React, { Component } from 'react';
import BooksList from './booksList';

class AddBook extends Component {

    render() {
        return (
            <div>
                <div className="search-books-bar">
                    <input
                        type="text"
                        name="book"
                        placeholder="Find book"
                        onChange={this.props.onSearchBook}
                    />
                </div>
                <button className="close-search" onClick={this.props.onGoBack}></button>
                <BooksList
                    books={ this.props.listBooks }
                    addBookText={ true }
                    onChangeBooksAction={this.props.onAddBookShelf}
                    onShowMoreInfoBook={this.props.onShowMoreInfoBook}
                />
            </div>
        )
    }
}

export default AddBook

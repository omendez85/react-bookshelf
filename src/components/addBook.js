import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import BooksList from './booksList';


class AddBook extends Component {

    state = {
        books: []
    }

    searchBook = (ev) => {

        if(ev.target.value === "") return;

        BooksAPI.search(ev.target.value, 10).then((books) => {
            console.log(2222);
            this.setState({ books });
        })
    }

    render() {
        return (
            <div>
                <input 
                    type='text' 
                    name='book' 
                    placeholder='Find book'
                    onChange={this.searchBook}
                />
                <BooksList
                    books={ this.state.books }
                    onChangeBooksAction={this.props.onAddBookShelf}
                />
            </div>
        )
    }
}

export default AddBook

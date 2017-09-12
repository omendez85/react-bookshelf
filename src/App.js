import React from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ShelfBooks from './components/shelfBooks'
import OverlayLoader from './components/overlay'
import './css/App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        loadingLayout: false,
        showSearchPage: false
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        })
    }

    showOverlayLoading = () => {
        this.setState(state => ({
            loadingLayout: true
        }));
    }

    hideOverlayLoading = () => {
        this.setState(state => ({
            loadingLayout: false
        }));
    }

    updateBookShelfCategory = (shelfCategory, book) => {

        this.showOverlayLoading();
        BooksAPI.update(book, shelfCategory).then((newListCategory) => {
            const books = this.state.books;
            for ( const category in newListCategory ) {
                const booksInCategory = newListCategory[category];

                booksInCategory.forEach( (bookId) => {
                    books.forEach(book => {
                        if( book.id === bookId){
                            book.shelf = category;
                        }
                    });
                });

            }

            this.setState(state => ({
                books: books
            }));

            this.hideOverlayLoading();

        });
    }

    render() {
        return (
            <div className="list-books">
                {  this.state.loadingLayout && (
                    <OverlayLoader/>
                )}
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <ShelfBooks
                        books={this.state.books}
                        updateBookShelfCategory={this.updateBookShelfCategory}
                    />
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default BooksApp

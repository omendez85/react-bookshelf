import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ShelfBooks from './components/shelfBooks'
import OverlayLoader from './components/overlay'
import AddBook from './components/addBook'
import { Link } from 'react-router-dom'

import './css/App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        loadingLayout: false
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        });
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

    addBookShelf = () => {
        console.log('Add book');
    }

    updateBookShelfCategory = (shelfCategory, book, index) => {

        this.showOverlayLoading();

        BooksAPI.update(book, shelfCategory).then((newListCategory) => {


            const books = this.state.books.map( (_book) => {
                if( _book.id === book.id ){
                    _book.shelf = shelfCategory;
                }
                return _book;
            });

            this.setState(state => ({
                books: books
            }));

            this.hideOverlayLoading();

        });
    }

    render() {
        return (
            <div className="list-books">

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <Route exact path='/' render={() => (
                    <div>
                        <div className="list-books-content">
                            <ShelfBooks
                                books={this.state.books}
                                updateBookShelfCategory={this.updateBookShelfCategory}
                            />
                        </div>
                        <div className="open-search">
                            <Link className='close-create-contact' to='/search'>Add Book</Link>
                        </div>
                    </div>
                )}/>

                <Route exact path='/search' render={({ history }) => (
                    <div className="search-books">
                        <AddBook 
                            onAddBookShelf={this.addBookShelf}
                        />
                    </div>
                )}/>

                {  this.state.loadingLayout && (
                    <OverlayLoader/>
                )}
            </div>
        )
    }
}

export default BooksApp

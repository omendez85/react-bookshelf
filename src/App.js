import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import ShelfBooks from './components/shelfBooks';
import OverlayLoader from './components/overlay';
import AddBook from './components/addBook';
import ErrorMessage from './components/errorMessage';
import OverlayMoreInfoBook from './components/overlayMoreInfoBook';
import debounce from 'debounce';

import './css/App.css';

class BooksApp extends React.Component {
    state = {
        shelfs: [],
        loadingLayout: false,
        searchBooks: [],
        errorMessageApi: false,
        showMoreInfoBook: false,
        bookMoreInfo: {}
    }

    componentDidMount() {
        BooksAPI.getAll().then((booksResponse) => {

            const shelfs = [];

            booksResponse.forEach( (book, index) => {

                let tempShelf = {
                    id: '',
                    name: '',
                    books: []
                };

                let shelfBookId = book.shelf;
                let shelfExist = shelfs.filter( (shelf) => shelf.id === shelfBookId);

                if ( !shelfExist.length ) {
                    tempShelf.id = shelfBookId;
                    tempShelf.name = this.formatNameShelf(shelfBookId);
                    tempShelf.books.push(book);
                    shelfs.push(tempShelf);
                } else {
                    shelfs.forEach( (shelf, i) => {
                        if (shelf.id === shelfBookId) {
                            shelf.books.push(book);
                        }
                    });
                }
            });
            this.setState({ shelfs });
        });
    }

    formatNameShelf = (shelfName) => {
        return shelfName.replace(/([A-Z]+)/g, " $1");
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

    searchBook = (inputValue) => {

        if(inputValue === "") {
            this.setState({ searchBooks: [] });
            return;
        }

        this.showOverlayLoading();

        BooksAPI.search(inputValue, 10).then((searchBooks) => {

            if (searchBooks.error) {
                this.setState({ searchBooks: [] });
            } else {
                this.setState({ searchBooks:this.addShelfSearchBooks(searchBooks) });
            }
            this.hideOverlayLoading();
        });
    }

    addShelfSearchBooks = (searchBooks) => {

        let arrayBooks = this.state.shelfs.reduce( (last, current) => {
            return last.concat([...current.books]);
        }, []);

        return searchBooks.map( book => {
            arrayBooks.forEach( bookStored => {
                if(book.id === bookStored.id ) { book.shelf = bookStored.shelf }
            });
            return book;         
        });       
    }

    showErrorMessage = () => {
        this.setState(state => ({
            errorMessageApi: true
        }));

        this.hideErrorMessage();
    }

    hideErrorMessage = () => {
        setTimeout( ()=>{
            this.setState(state => ({
                errorMessageApi: false
            }));
        }, 3000)
    }

    showMoreInfoBook = (book) => {
        this.setState(state => ({
            showMoreInfoBook: true,
            bookMoreInfo: book
        }));
    }

    cleanSearch = () => {
        this.setState({ searchBooks: [] });
    }
    hideMoreInfoBook = () => {
        this.setState(state => ({
            showMoreInfoBook: false,
            bookMoreInfo: {}
        }));
    }

    updateBookShelfCategory = (newShelfCategory, book) => {

        this.showOverlayLoading();

        BooksAPI.update(book, newShelfCategory).then((newListCategory) => {

            const shelfs = this.state.shelfs;

            shelfs.forEach( (shelf, i) => {

                //remove book from currenshelf
                if (shelf.id === book.shelf) {
                    shelf.books = shelf.books.filter( (bookInShelf) => bookInShelf.id !== book.id )
                }

                // add book new shelf
                if (shelf.id === newShelfCategory) {
                    book.shelf = newShelfCategory;
                    shelf.books.push(book);
                }

            });

            this.setState({ shelfs });
            this.hideOverlayLoading();
        });
    }

    render() {

        const searchBook = debounce( this.searchBook, 200);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>
                        <Link to='/'>MyReads</Link>
                    </h1>
                </div>

                <Route exact path='/' render={() => (
                    <div>
                        <div className="list-books-content">
                            <ShelfBooks
                                shelfs={this.state.shelfs}
                                updateBookShelfCategory={this.updateBookShelfCategory}
                                onShowMoreInfoBook={ (book) => {this.showMoreInfoBook(book)} }
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
                            listBooks={this.state.searchBooks}
                            onAddBookShelf={ (shelfCategory, book) => {
                                this.updateBookShelfCategory(shelfCategory, book)
                            }}
                            onSearchBook={searchBook}
                            onShowMoreInfoBook={ (book) => {
                                this.showMoreInfoBook(book)
                                this.cleanSearch()
                            }}
                            onGoBack={ () => {
                                history.push('/')
                                this.cleanSearch()
                            }}
                        />
                    </div>
                )}/>

                {  this.state.loadingLayout && (
                    <OverlayLoader/>
                )}

                {  this.state.errorMessageApi && (
                    <ErrorMessage/>
                )}

                {  this.state.showMoreInfoBook && (
                    <OverlayMoreInfoBook
                        book={this.state.bookMoreInfo}
                        onHideMoreInfoBook={this.hideMoreInfoBook}
                    />
                )}
            </div>
        )
    }
}

export default BooksApp;

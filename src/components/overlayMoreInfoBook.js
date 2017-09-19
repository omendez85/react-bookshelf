import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OverlayMoreInfoBook extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {
        const book = this.props.book;
        const authors = book.authors.map( (author, i) =>
                            <span className="attr" key={i}> {author}, </span>
                        );
        return (
        <div className="overlay-info-book">
            <div className="container-overlay">
                <div className="container-content">
                    <h1> {book.title }</h1>
                    <img src={book.imageLinks.smallThumbnail} alt={book.title} />
                    <ol>
                        <li>
                            <span className="label-attr">Authors</span>: { authors }
                        </li>
                        <li>
                            <span className="label-attr">Info Link: </span>
                            <a href={ book.infoLink } alt={'More Info'} target="_blank">More Info</a>
                        </li>
                        <li>
                            <span className="label-attr">Page Count</span>: { book.pageCount }
                        </li>
                        <li>
                            <span className="label-attr">Publish Date</span>: { book.publishedDate }
                        </li>
                        <li>
                            <span className="label-attr">Description</span>: { book.description }
                        </li>
                    </ol>
                </div>
                <div className="close-overlay">
                    <button className="close-overlay" onClick={this.props.onHideMoreInfoBook}>X</button>
                </div>
            </div>
        </div>
        )
    }
}

export default OverlayMoreInfoBook;

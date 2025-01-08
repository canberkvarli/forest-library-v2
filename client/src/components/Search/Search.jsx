import { useState } from "react";
import AddLeaf from "../Leaf/addLeaf"
import "./search.css";

const Search = () => {
    const [book, setBook] = useState("");
    const [results, setResults] = useState([]);
    const [warning, setWarning] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [detailComponent, setDetailComponent] = useState(null);

    const apiKey = "AIzaSyB8uY1e1Cxe0tLz_rRJtjqjOGZb3Sw2ITA";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (book.trim().length === 0) {
            setWarning(true);
            return;
        }

        setWarning(false);
        setSubmitted(false);
        setDetailComponent(null);

        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=40`
            );
            const data = await response.json();
            setResults(data.items || []);
            setBook(""); // Clear the search input
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleChange = (e) => {
        setBook(e.target.value);
    };

    const handleBookClick = (bookTitle, bookAuthors) => {
        setDetailComponent(
            <AddLeaf
                setDetailComponent={() => setDetailComponent(null)}
                bookTitle={bookTitle}
                bookAuthor={bookAuthors.length > 0 ? bookAuthors : ["No Author"]}
            />
        );
        setSubmitted(true);
    };

    return (
        <div>
            <div className="search-div">
                <form className="form-search" onSubmit={handleSubmit}>
                    <input
                        className="btn"
                        type="text"
                        placeholder="Search for Books"
                        value={book}
                        onChange={handleChange}
                    />
                    <input className="btn-submit" type="submit" value="Search" />
                </form>
                {warning && <p className="warning">Please enter a search term!</p>}
            </div>

            {detailComponent}

            {!submitted && results.length > 0 && (
                <div className="search-results">
                    <ul className="book-list">
                        {results.map((bookItem, i) => {
                            const bookInfo = bookItem.volumeInfo;
                            return (
                                <li
                                    key={i}
                                    className="book-list-item"
                                    onClick={() =>
                                        handleBookClick(
                                            bookInfo.title,
                                            bookInfo.authors || ["No Author"]
                                        )
                                    }
                                >
                                    <button>
                                        {bookInfo.imageLinks?.thumbnail ? (
                                            <img
                                                id="book-img"
                                                src={bookInfo.imageLinks.thumbnail}
                                                alt={bookInfo.title}
                                            />
                                        ) : (
                                            <img
                                                id="book-img"
                                                src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                                                alt="No Cover Available"
                                            />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {!submitted && results.length === 0 && (
                <img
                    className="search-background"
                    src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1126130554%2F13-books-to-help-your-job-search%2F960x0.jpg%3FcropX1%3D0%26cropX2%3D5472%26cropY1%3D547%26cropY2%3D3625"
                    alt="Search background"
                />
            )}
        </div>
    );
};

export default Search;

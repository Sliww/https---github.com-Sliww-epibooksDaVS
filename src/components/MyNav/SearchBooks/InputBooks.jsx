import { BookContext } from "../../../context/bookcontext";
import "./inputBooks.css";
import { useContext, useState } from "react";

export const InputBooks = () => {
    const { books, setBooks, allBooks } = useContext(BookContext);
    const [searchInput, setSearchInput] = useState("");

    const onChangeInput = (e) => {
        setSearchInput(e.target.value);
    };

    const filterBooks = () => {
        if (searchInput === "") {
            setBooks(allBooks);
        } else {
            const filteredBook = books.filter(book => {
                return book.title.toLowerCase().includes(searchInput.toLowerCase());
            });
            setBooks(filteredBook);
        }
    };

    

    return (
        <div className=" d-none d-lg-flex">
            <input
                className="p-1"
                type="text"
                name="searchbook"
                placeholder="What are you searching?"
                onChange={onChangeInput}
            />
            <button
                className="buttonCustom ms-2 p-1"
                onClick={filterBooks}
            >
                SEARCH
            </button>
        </div>
    );
};


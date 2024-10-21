import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [isBookLoading, setIsBookLoading] = useState(false);
    const [isBookError, setIsBookError] = useState("");
    


    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    const getBooks = async () => {
        setIsBookLoading(true);
        setIsBookError("");
        try {
            const response = await fetch(`http://localhost:4010/books?page=${page}&pageSize=${pageSize}`
            );
            const result = await response.json();
            console.log(result);
            setBooks(result.books);
            setAllBooks(result.books);
        } catch (error) {
            setIsBookError(error.message);
        } finally {
            setIsBookLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, [page, pageSize]);

    console.log(books)
    console.log(allBooks)

    return (
        <BookContext.Provider
            value={{ books, setBooks, allBooks, isBookLoading, isBookError, page, setPage, pageSize, setPageSize }}
        >
            {children}
        </BookContext.Provider>
    );
};


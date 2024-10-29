import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [isBookLoading, setIsBookLoading] = useState(false);
    const [isBookError, setIsBookError] = useState("");
    
    const [totalPages, setTotalPages] = useState(0);
    


    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    const getBooks = async () => {
        setIsBookLoading(true);
        setIsBookError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/books?page=${page}&pageSize=${pageSize}`
            );
            const result = await response.json()
            setBooks(result.books);
            setAllBooks(result.books);
            setTotalPages(result.totalPages);
        } catch (error) {
            setIsBookError(error.message);
        } finally {
            setIsBookLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, [page, pageSize]);


    return (
        <BookContext.Provider
            value={{ books, setBooks, allBooks, isBookLoading, isBookError, page, setPage, pageSize, setPageSize, totalPages }}
        >
            {children}
        </BookContext.Provider>
    );
};


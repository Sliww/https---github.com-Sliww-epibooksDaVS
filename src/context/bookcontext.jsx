import { createContext, useState } from "react";
import fantasy from "../data/fantasy.json";
import history from "../data/history.json";
import horror from "../data/horror.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";

export const BookContext = createContext();

export const BookContextProvider = ({children})=>{

    const shuffleArray = (array) => {
        const shuffledArray = [];
        array.forEach((item) => {
            const randomIndex = Math.floor(Math.random() * (shuffledArray.length + 1));
            shuffledArray.splice(randomIndex, 0, item);
        });
        return shuffledArray;
    };

    const allBooks = [...scifi, ...history, ...fantasy, ...horror, ...romance]
    const someBooks = shuffleArray([...allBooks]).slice(0, 20);

    const [books, setBooks] = useState(someBooks)

    const [initialBooks, setInitialBooks] = useState(someBooks)

    const [selectedBook, setSelectedBook] = useState([]);

    const [isSelected, setIsSelected] = useState([]);

    

    const onChangeSelected = (asin) => {
        setIsSelected(
            isSelected.includes(asin) ? isSelected.splice(asin, 1) : [asin]
        );
        handleSelectBook(isSelected);
    };

    const handleSelectBook = (isSelected) => {
        const selectedBook = books.find((book) => book.asin === String(isSelected));
        if (selectedBook) {
            setSelectedBook(selectedBook);
        }
    };


    return (
        <BookContext.Provider
        value= {{ someBooks, books, setBooks, initialBooks, isSelected, setIsSelected, onChangeSelected, handleSelectBook, selectedBook, setSelectedBook }}
        >
            {children}
        </BookContext.Provider>
    )
}
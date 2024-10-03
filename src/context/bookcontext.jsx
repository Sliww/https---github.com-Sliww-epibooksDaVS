import { createContext, useState } from "react";
import fantasy from "../data/fantasy.json";
import history from "../data/history.json";
import horror from "../data/horror.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";

export const BookContext = createContext();

export const BookContextProvider = ({children})=>{

    const allBooks = [...scifi, ...history, ...fantasy, ...horror, ...romance]
    const someBooks = allBooks.slice(0, 20);

    const [books, setBooks] = useState(someBooks)

    const [initialBooks, setInitialBooks] = useState(someBooks)


    return (
        <BookContext.Provider
        value= {{ someBooks, books, setBooks, initialBooks }}
        >
            {children}
        </BookContext.Provider>
    )
}
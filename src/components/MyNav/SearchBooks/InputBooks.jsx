import { BookContext } from "../../../context/bookContext"
import "./inputBooks.css"
import { useContext, useState } from "react"


export const InputBooks = () => {

    const { books, setBooks, initialBooks } = useContext(BookContext)

    const [searchInput, setSearchInput] = useState("")

    const onChangeInput = (e) => {
        setSearchInput(e.target.value)

    }

    const filterBooks = () => {

        if (searchInput === "") {
            setBooks(initialBooks)
        } else {

            const filteredBook = books.filter(book => {
                return book.title.toLowerCase().includes(searchInput.toLocaleLowerCase())
            })
            setBooks(filteredBook)
        }
    }

    console.log(initialBooks)


    return (
        <div>
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
    )
}


import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ContactUs } from './pages/ContactUs'
import { NotFound } from './pages/NotFoundPage'
import { Details } from './pages/Details'
import { AddBook } from './components/MyNav/ProfileIcon/OffCanvassMenu/AddBook/AddBook'

const App = () => {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/details/:asin' element={<Details/>}/>
        <Route path='/addbook/' element={<AddBook/>}/>
        

        <Route path='*' element={<NotFound/>} />



      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

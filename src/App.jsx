import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ContactUs } from './pages/ContactUs'
import { NotFound } from './pages/NotFoundPage'
import { Details } from './pages/Details'
import { AddBookPage } from './pages/AddBookPage'
import { Login } from './pages/Login'

const App = () => {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/books/byid/:id' element={<Details/>}/>
        <Route path='/addbook/' element={<AddBookPage/>}/>
        <Route path='/login/' element={<Login/>}/>
        

        <Route path='*' element={<NotFound/>} />



      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

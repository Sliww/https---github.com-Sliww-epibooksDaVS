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
import ProtectedRoutes from './middlewares/ProtectedRoutes'

const App = () => {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/books/byid/:id' element={<Details/>}/>
        <Route path='/login/' element={<Login/>}/>

        {/* Protected Routes */}

        <Route element={<ProtectedRoutes/>}>
          <Route path='/addbook/' element={<AddBookPage/>}/>
        </Route>

        <Route path='*' element={<NotFound/>} />



      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

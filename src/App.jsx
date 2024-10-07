import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ContactUs } from './pages/ContactUs'

const App = () => {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>

        <Route path='/about' element={<About/>}/>

        <Route path='/contactus' element={<ContactUs/>}/>



      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

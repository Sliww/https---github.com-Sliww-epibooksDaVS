import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from './components/MyNav/Navbar'
import { HeroSection } from './components/MyHero/myHero'
import { MainSection } from './components/MainSection/MainSection'

const App = ()=> {
  

  return (
    <>
      <Navbar/>
      <HeroSection/>
      <MainSection/>
    </>
  )
}

export default App

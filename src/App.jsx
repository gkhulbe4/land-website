import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import AddLand from './components/AddLand'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import AllLands from './components/AllLands';
import Admin from './components/Admin'
import Edit from './components/Edit'
import { ChakraProvider } from '@chakra-ui/react'
import Prac from './components/Prac'
import Prac2 from './components/Prac2'
import Prac3 from './components/Prac3'
import Land from './components/Land'


function App() {

  return (
   <ChakraProvider>
    <div>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addland" element={<AddLand/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/alllands' element={<AllLands/>}/>
        <Route path='/edit/:landId' element={<Edit/>}/>
        <Route path='/land/:landId' element={<Land/>}/>
        <Route path='/prac' element={<Prac/>}/>
        <Route path='/prac2' element={<Prac2/>}/>
        <Route path='/prac3' element={<Prac3/>}/>
      </Routes>
      <Footer/>
    </Router>
   </div>
   </ChakraProvider>
  )
}

export default App

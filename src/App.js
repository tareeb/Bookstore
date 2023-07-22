import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage'
import UserPage from './pages/UserPage';
import Bookspage from './pages/Bookspage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Searchpage from './pages/searchpage';
import Request from './pages/Requestpage';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>

        <Navbar></Navbar>
        
          <Routes>
            <Route path='/' element={<Homepage></Homepage>}/>
            <Route path='/home' element={<Homepage></Homepage>}/>
            
            <Route path='/login' element={<LoginPage></LoginPage>}/>
            <Route path='/signup' element={<SignupPage></SignupPage>}/>
            
            <Route path='/user' element={<UserPage></UserPage>}/>
            <Route path='/books' element={<Bookspage></Bookspage>}/>

            <Route path='/search' element={<Searchpage></Searchpage>}/>

            <Route path='/loginrequest' element={<Request></Request>} ></Route>

            <Route path='/logout' element={<Logout></Logout>} ></Route>

            <Route path='*' element={<p>No Page Found</p>} ></Route>
          </Routes>
       
        <Footer></Footer>
        
    </BrowserRouter>
  );
}

export default App;

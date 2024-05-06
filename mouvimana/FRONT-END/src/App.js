import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/header';
import Home from './pages/home';
import Films from './pages/films';
import About from './pages/about';
import Footer from './components/footer';
import FilmDetails from './pages/filmDetails';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Profile from './pages/profile';

function App() {
  return (
    <div className="before:box-border after:box-border before:m-0 after:p-0">
      <Routes>
        <Route path='/' element={<Header/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/films' element={<Films/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profil' element={<Profile/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/film/:id' element={<FilmDetails/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

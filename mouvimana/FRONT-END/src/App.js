import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/header';
import Home from './pages/home';
import Films from './pages/films';
import About from './pages/about';
import Footer from './components/footer';

function App() {
  return (
    <div className="before:box-border after:box-border before:m-0 after:p-0">
      <Routes>
        <Route path='/' element={<Header/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/films' element={<Films/>}/>
          <Route path='/about' element={<About/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

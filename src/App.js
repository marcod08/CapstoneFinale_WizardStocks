import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Favs from './pages/Favs';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import UserPanel from './pages/UserPanel';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Stocks from './pages/Stocks';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:cardId' element={<Details />} />
          <Route path='/favs' element={<Favs />} />
          <Route path='/stocks' element={<Stocks />}></Route>
          <Route path='/auth' element={<Auth />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/panel' element={<UserPanel />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';

function App() {
  return (
    <div>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;

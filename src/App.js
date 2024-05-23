import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login}></Route>
        <Route path='/dashboard' Component={Dashboard}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
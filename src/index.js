import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Search from './Search';
import { Navbar } from 'react-bootstrap';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
<Router>

    <Routes>
        <Route exact path='/' element={<App/>}/>
        <Route exact path='/Search' element={<Search/>}/>
    </Routes>
</Router>

);

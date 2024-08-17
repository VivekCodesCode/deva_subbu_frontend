import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
function Navbars(params) {
 return(
<>
<Navbar className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand className='navbar-content' href="#home">VivekApp</Navbar.Brand>
       <Link style={{textDecoration:"none"}} to="/Search">   <Navbar.Brand className='navbar-content'>Search</Navbar.Brand></Link>
        </Container>
      </Navbar>
</>
 )  ; 
}
export default Navbars;
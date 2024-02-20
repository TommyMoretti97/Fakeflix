import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';


function NavbarHome ({ buttonTitle }) {

 
    return(
        <>
            <Navbar  className="bg-dark w-75 m-auto" id='navbar'>
      
        <Navbar.Brand ><Link to={'/'}><img src="../src/assets/img/Fakeflix1.png" alt="netflix-logo" width='130px' height='50px'/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={'/films' }className='nav-link text-white a-nav'>Films</Link>
            <Link to={'/tv-series'} className='nav-link text-white a-nav'>TV Series</Link>
            <Link to={'/categories'} className='nav-link text-white a-nav'>Categories</Link>
           <Link to={'/search' }className='nav-link text-white a-nav'>Search</Link>
           <Link to={`/my-list/${buttonTitle}`} className='nav-link text-white a-nav'>My List</Link>
          </Nav>
          <Form className="d-flex mx-4 align-items-center">
            <Dropdown></Dropdown>
          </Form>
        </Navbar.Collapse>
      
    </Navbar>
        </>
    )
}

 export default NavbarHome
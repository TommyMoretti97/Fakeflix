import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function DropdownComponents() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='dark' id="dropdown-basic">
      <img src='https://static.vecteezy.com/ti/vettori-gratis/p1/26434409-vettore-icona-profilo-avatar-predefinito-foto-dell-utente-dei-social-media-vettoriale.jpg' alt="logo-profile" width='50px' height='50px'className='text-white mx-4 rounded-circle'/>
      </Dropdown.Toggle>

      <Dropdown.Menu className='bg-dark'>
       <Dropdown.Item className='text-white '> <Link >ManageProfile</Link></Dropdown.Item>
       <Dropdown.Item className='text-white '> <Link >Account</Link></Dropdown.Item>
        <Dropdown.Item href="#" className='text-white'>Help Center</Dropdown.Item>
        <hr className='text-white'/>
        <Dropdown.Item href="#" className='text-white'>Login</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownComponents;
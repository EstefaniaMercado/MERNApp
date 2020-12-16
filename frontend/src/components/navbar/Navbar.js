import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavbarHeader = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
      
      <div>
        {name && 
      <Navbar color="light" light expand="md">
        <NavbarBrand>{ name }</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/users">Usuarios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/graphic">Gráfico</NavLink>
            </NavItem>
          </Nav>
          <NavLink onClick={ handleLogout }>Salir</NavLink>
        </Collapse>
      </Navbar> 
      }
    </div>

        // <div className="navbar navbar-dark bg-dark mb-4">
        //     <span className="navbar-brand">
        //         { name }
        //     </span>
            
        //     <button 
        //         className="btn btn-outline-danger"
        //         onClick={ handleLogout }
        //     >
        //         <i className="fas fa-sign-out-alt"></i>
        //         <span> Salir</span>
        //     </button>

        // </div>
    )
}

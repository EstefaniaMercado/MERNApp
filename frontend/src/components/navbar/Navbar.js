import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux'
import {startLogout} from '../../actions/auth';
import {Link} from 'react-router-dom';
import './navbar.css';

export const NavbarHeader = () => {
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const [isOpen,
        setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (

        <div>
            <Navbar className="color" light expand="md">
                <NavbarBrand>{name}</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/">Usuarios</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/graphic">Gráfico</Link>
                        </NavItem>
                    </Nav>
                    <NavLink className="pl-0" onClick={handleLogout}>Salir</NavLink>
                </Collapse>
            </Navbar>
        </div>
    )
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';

interface Props {
    toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <BootstrapNavbar expand="lg" bg="light" variant="light" className="p-3">
      <Container>
        <div className='d-flex align-items-center'>
            <NavLink className="navbar-brand" to={"/admin"}>داشبورد</NavLink>
            <BootstrapNavbar id="navbarNav">
              <Nav className="ml-auto">
                <NavDropdown title="تنظیمات " id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to={"/admin/profile"}>پروفایل</NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    onClick={() => localStorage.setItem('token', '')}
                    to={"/admin/login"}
                  >
                    خروج
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </BootstrapNavbar>
        </div>
        <BootstrapNavbar.Toggle onClick={toggleSidebar} aria-controls="navbarNav" />
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

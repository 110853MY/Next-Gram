import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import LoginModal from './Modal';

const NavBar = ({ signUpUser, loginUser, currentUser, logoutUser }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Nextagram</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink activeClassName="active" tag={Link} to="/">
                                Home
                            </NavLink>
                            {currentUser ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} to="/profile">
                                            My Profile
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} to="/image/upload">
                                            Upload
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink onClick={logoutUser} style={{ cursor: "pointer" }}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>
                            ) : (
                                    <NavItem>
                                        <LoginModal
                                            buttonLabel="Login"
                                            signUpUser={signUpUser}
                                            loginUser={loginUser}
                                        />
                                    </NavItem>
                                )}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default NavBar;
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        Pet Toys
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse className="justify-content-center" id="navbarScroll">

                    <Nav
                        className="m-auto my-2 my-lg-0"
                    >
                        <Nav.Item>
                            <LinkContainer to="/">
                                <Nav.Link>
                                    Головна
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    Кошик <i className="fas fa-shopping-cart"></i>
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>

                        ) : (
                            <Nav.Item>
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Увійти
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        )}
                        {userInfo && userInfo.isAdmin && (
                          <NavDropdown title={'Admin panel'} id="admin">
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>
                                        Users list
                                    </NavDropdown.Item>
                                </LinkContainer>
                              <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>
                                        Products list
                                    </NavDropdown.Item>
                                </LinkContainer>
                              <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>
                                        Orders list
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>

                        )}

                    </Nav>
                    <SearchBox/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
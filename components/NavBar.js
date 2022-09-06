/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Nav, Container,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link passHref href="/">
              <span className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
                CommonMeal
                <img src="https://api.iconify.design/noto:pot-of-food.svg" alt="commonmeal logo" />
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey="1" className="nav-item">
                <Link passHref href="/">
                  <span className="nav-link">Home</span>
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="2" className="nav-item">
                <Link passHref href="/food/myFood">
                  <span className="nav-link">My Kitchen Page</span>
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="3" className="nav-item">
                <Link passHref href="/food/public/publicItems">
                  <span className="nav-link">Public Item Page</span>
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="4" className="nav-item">
                <Link passHref href="/profile/myProfile">
                  <span className="nav-link">My Profile Page</span>
                </Link>
              </Nav.Link>
              <button type="button" className="btn btn-danger" onClick={signOut}>
                Sign Out
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

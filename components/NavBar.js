/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <span className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            CommonMeal
            <img src="https://api.iconify.design/noto:pot-of-food.svg" alt="commonmeal logo" />
          </span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <span className="nav-link">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/food/myFood">
                <span className="nav-link">My Kitchen Page</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/food/public/publicItems">
                <span className="nav-link">Public Item Page</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/profile/myProfile">
                <span className="nav-link">My Profile Page</span>
              </Link>
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

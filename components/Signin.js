/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <div className="landing-page-sign-in-page-div">
        <span className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
          CommonMeal
          <img src="https://api.iconify.design/noto:pot-of-food.svg" alt="commonmeal logo" />
        </span>
      </div>

      <div className="create-profile-sign-in background-image">
        <div className="landingPageDiv">
          <h1 className="landingPageh1">Don&apos;t</h1>
          <h1 className="landingPageh1">Waste</h1>
          <h1 className="landingPageh1">Your</h1>
          <h1 className="landingPageh1">(Kitchen)</h1>
          <h1 className="landingPageh1">Waste</h1>
        </div>
        <h4>Click the button below to login!</h4>
        <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
      <footer>
        <a href="https://www.freepik.com/free-photo/food-delivery-new-normal-lifestyle-concept_17602112.htm#page=6&query=food%20waste&position=42&from_view=search#position=42&page=6&query=food%20waste">Image by rawpixel.com on Freepik</a>
      </footer>
    </>
  );
}

export default Signin;

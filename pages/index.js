import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleUserProfile } from '../api/profileData';
import { getRecipebyID, getRecipeByIngredient } from '../api/spoonacularData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  // eslint-disable-next-line no-unused-vars
  const spoonAPICalls = () => {
    getRecipeByIngredient().then(getRecipebyID());
  };

  const getUserProfile = () => {
    getSingleUserProfile(user.uid).then(setUserProfile);
  };

  useEffect(() => {
    // spoonAPICalls();
    document.title = 'CommonMeal';
    getUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Object.keys(userProfile).length === 0) {
    return (
      <div className="container">
        <h2>You Need to Create a User Profile</h2>
        <Button className="btn btn-primary btn-lg copy-btn" type="button" href="profile/createProfile">
          Get Started
        </Button>
      </div>
    );
  }
  return (
    <div className="container">
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          padding: '100px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 className="landingPageh1">Don&apos;t</h1>
        <h1 className="landingPageh1">Waste</h1>
        <h1 className="landingPageh1">Your</h1>
        <h1 className="landingPageh1">(Kitchen)</h1>
        <h1 className="landingPageh1">Waste</h1>
        <Button className="btn btn-primary btn-lg copy-btn" type="button" href="food/myFood">
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Home;

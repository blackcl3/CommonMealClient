import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleUserProfile } from '../api/profileData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});

  const getUserProfile = () => {
    getSingleUserProfile(user.uid).then(setUserProfile);
  };

  useEffect(() => {
    document.title = 'CommonMeal';
    getUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.length === 0) {
    return (
      <h1>You Must Sign In to See This Content</h1>
    );
  }

  if (Object.keys(userProfile).length === 0) {
    return (
      <>
        <div className="create-profile-sign-in">
          <h2>You Need to Create a User Profile</h2>
          <Button className="btn btn-primary btn-lg copy-btn" type="button" href="profile/createProfile">
            Get Started
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <div className="landingPageDiv">
          <h1 className="landingPageh1">Don&apos;t</h1>
          <h1 className="landingPageh1">Waste</h1>
          <h1 className="landingPageh1">Your</h1>
          <h1 className="landingPageh1">(Kitchen)</h1>
          <h1 className="landingPageh1">Waste</h1>
        </div>
        <div className="landingPageBtnDiv">
          <Button className="btn btn-primary btn-lg copy-btn landingPageBtn" type="button" href="food/myFood">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;

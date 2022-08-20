import { useEffect } from 'react';
import { getRecipebyID, getRecipeByIngredient } from '../api/spoonacularData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  console.warn(user);
  // eslint-disable-next-line no-unused-vars
  const spoonAPICalls = () => {
    getRecipeByIngredient().then(getRecipebyID());
  };
  useEffect(() => {
    // spoonAPICalls();
  }, []);
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
        <button className="btn btn-primary btn-lg copy-btn" type="button">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;

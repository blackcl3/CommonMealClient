import React, { useEffect, useState } from 'react';
import getSingleNeighborhood from '../../api/neighborhoodData';
import MyProfileCard from '../../components/MyProfileCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyProfilePage() {
  const { user } = useAuth();
  const [neighborhoodObj, setNeighborhood] = useState({});

  const getNeighborhood = () => {
    getSingleNeighborhood(user.neighborhood).then(setNeighborhood);
  };

  useEffect(() => {
    getNeighborhood(user.neighborhood);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="profile-container">
      <MyProfileCard name={user.name} address={user.address} photoURL={user.photo_url} neighborhood={neighborhoodObj.name} uid={user.uid} />
    </div>
  );
}

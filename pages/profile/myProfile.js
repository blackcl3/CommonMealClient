import React, { useEffect, useState } from 'react';
import { getSingleNeighborhood } from '../../api/neighborhoodData';
import { getSingleUserProfile } from '../../api/profileData';
import { useAuth } from '../../utils/context/authContext';
import MyProfileCard from '../../components/MyProfileCard';

export default function MyProfilePage() {
  const { user } = useAuth();
  const [neighborhoodObj, setNeighborhood] = useState({});
  const getNeighborhood = () => {
    getSingleNeighborhood(user.neighborhood).then(setNeighborhood);
  };

  useEffect(() => {
    getSingleUserProfile(user.uid).then(() => getNeighborhood());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="profile-container">
      <MyProfileCard name={user.name} address={user.address} photoURL={user.photo_url} neighborhood={neighborhoodObj.name} neighborhoodID={neighborhoodObj.id} uid={user.uid} onChange={getNeighborhood} />
    </div>
  );
}

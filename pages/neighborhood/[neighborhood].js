import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleNeighborhood } from '../../api/neighborhoodData';
import MyProfileCard from '../../components/MyProfileCard';

export default function NeighborhoodPage() {
  const [neighborhoodProfile, setNeighborhood] = useState([]);
  const router = useRouter();
  const { neighborhood } = router.query;

  function getNeighborhoodDetails() {
    getSingleNeighborhood(neighborhood).then(setNeighborhood);
  }

  useEffect(() => {
    getNeighborhoodDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neighborhood]);

  return (
    <>
      <h1 className="neighborhood-title">{neighborhoodProfile.name}</h1>
      {neighborhoodProfile.uid?.map((profile) => (
        <MyProfileCard key={profile.id} name={profile.name} address={profile.address} photoURL={profile.photo_url} neighborhood={neighborhoodProfile.name} uid={profile.uid} />
      ))}
    </>
  );
}

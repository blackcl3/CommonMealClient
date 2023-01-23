import React, { useEffect, useState } from 'react';
import { getNeighborhoods } from '../../api/neighborhoodData';
import NeighborhoodCard from '../../components/NeighborhoodCard';

export default function Index() {
  const [neighborhoods, setNeighborhood] = useState([]);

  const getPageContent = () => {
    getNeighborhoods().then(setNeighborhood);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  return (
    <>
      <h1>Neighborhoods</h1>
      {neighborhoods?.map((neighborhood) => (
        <NeighborhoodCard key={neighborhood.id} name={neighborhood.name} neighborhoodID={neighborhood.id} />
      ))}
    </>
  );
}

import { string } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function NeighborhoodCard({ neighborhoodID, name }) {
  return (
    <Card className="myProfileCard">
      <Card.Body>
        <Card.Title>Neighborhood:</Card.Title>
        <Button variant="link" href={`/neighborhood/${neighborhoodID}`}>{name}</Button>
      </Card.Body>
    </Card>
  );
}

NeighborhoodCard.propTypes = {
  neighborhoodID: string,
  name: string,
}.isRequired;

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';

export default function MyProfileCard({ obj }) {
  return (
    <Card>
      <Card.Img variant="top" src={obj.photoURL} />
      <Card.Body>
        <Card.Title>Name: {obj.name} </Card.Title>
        <Card.Text>
          Address: {obj.address}
          Zip: {obj.zip}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

MyProfileCard.propTypes = {
  obj: PropTypes.shape({
    name: string,
    address: string,
    photoURL: string,
    zip: string,
  }).isRequired,
};

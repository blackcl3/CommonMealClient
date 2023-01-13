import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MyProfileCard({
  name, address, photoURL, neighborhood, uid,
}) {
  return (
    <Card className="myProfileCard">
      <Card.Img variant="top" src={photoURL} className="myProfileImage" />
      <Card.Body>
        <Card.Title>Name: {name} </Card.Title>
        <Card.Text>Address: {address}</Card.Text>
        <Card.Text>Neighborhood: {neighborhood}</Card.Text>
        <Button variant="primary" href={`/profile/edit/${uid}`}>
          Edit Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

MyProfileCard.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  photoURL: PropTypes.string,
  neighborhood: PropTypes.string,
  uid: PropTypes.string,
}.isRequired;

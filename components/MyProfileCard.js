import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';

export default function MyProfileCard({ obj }) {
  return (
    <Card className="myProfileCard">
      <Card.Img variant="top" src={obj.photoURL} className="myProfileImage" />
      <Card.Body>
        <Card.Title>Name: {obj.name} </Card.Title>
        <Card.Text>Address: {obj.address}</Card.Text>
        <Card.Text>Zip: {obj.zip}</Card.Text>
        <Button variant="primary" href={`/profile/edit/${obj.profileFirebaseKey}`}>
          Edit Profile
        </Button>
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
    profileFirebaseKey: string,
  }).isRequired,
};

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

export default function MyProfileCard({
  name, address, photoURL, neighborhood, neighborhoodID, uid,
}) {
  const { user } = useAuth();
  return (
    <Card className="myProfileCard">
      <Card.Img variant="top" src={photoURL} className="myProfileImage" />
      <Card.Body>
        <Card.Title>Name: {name} </Card.Title>
        <Card.Text>Address: {address}</Card.Text>
        <Link variant="link" href={`/neighborhood/${neighborhoodID}`} passHref>
          <div>Neighborhood: {neighborhood}</div>
        </Link>
        {
          uid === user.uid ? (
            <Button variant="primary" href={`/profile/edit/${uid}`}>
              Edit Profile
            </Button>
          )
            : (<></>)

        }

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

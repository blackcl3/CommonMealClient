import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function CommentCard({ obj, setCommentUpdate }) {
  const { user } = useAuth();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{obj.displayName}</Card.Title>
        <Card.Text>{obj.commentText}</Card.Text>
      </Card.Body>
      {user.uid === obj.uid ? (<Button onClick={() => { setCommentUpdate(obj); }}>Edit</Button>) : ''}
    </Card>
  );
}

CommentCard.propTypes = {
  obj: PropTypes.shape({
    displayName: string,
    commentText: string,
    uid: string,
  }).isRequired,
  setCommentUpdate: PropTypes.func.isRequired,
};

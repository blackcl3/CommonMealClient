import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, FormGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPublicFoodComment, updateComment } from '../../api/commentData';

const initialState = {
  commentText: '',
  displayName: '',
  commentFirebaseKey: '',
};

export default function CommentForm({ obj, foodItemFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const [comment, setCommentObj] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.commentFirebaseKey) {
      setFormInput(obj);
      setCommentObj(obj);
    }
  }, [user, obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.commentFirebaseKey) {
      updateComment(formInput)
        .then(() => {
          setFormInput(initialState);
          setCommentObj({});
          router.push(`/food/public/${foodItemFirebaseKey}`);
        });
    } else {
      const payload = {
        ...formInput, uid: user.uid, foodItemFirebaseKey, displayName: user.displayName,
      };
      createPublicFoodComment(payload).then(() => {
        router.push(`/food/public/${foodItemFirebaseKey}`);
      });
      setFormInput(initialState);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="comment-form">
      <h1>Comment Form</h1>
      <FormGroup className="comment-form-input">
        <FloatingLabel label="Comment Text">
          <Form.Control type="text" placeholder="Enter A Comment" value={formInput.commentText} name="commentText" onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <h6>User Name: {user.displayName}</h6>
      <Button type="submit">{comment.commentFirebaseKey ? 'Edit' : 'Add'} Your Comment</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    commentText: PropTypes.string,
    displayName: PropTypes.string,
    commentFirebaseKey: PropTypes.string,
  }),
  foodItemFirebaseKey: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};

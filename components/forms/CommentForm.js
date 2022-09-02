import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, FormGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPublicFoodComment } from '../../api/commentData';

const initialState = {
  commentText: '',
  commentAuthor: '',
  commentFirebaseKey: '',
};

export default function CommentForm({ obj, foodItemFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.commentFirebaseKey) setFormInput(obj);
  }, [obj]);

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
      // updateComment(formInput)
      //   .then(() => { router.push(`/food/public/${foodItemFirebaseKey}`); });
    } else {
      const payload = {
        ...formInput, uid: user.uid, foodItemFirebaseKey, displayName: user.displayName,
      };
      createPublicFoodComment(payload).then(() => {
        router.push(`/food/public/${foodItemFirebaseKey}`);
      });
    }
  };

  console.warn(user, router);
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Comment Form</h1>
      <FormGroup>
        <FloatingLabel label="Comment Text">
          <Form.Control type="text" placeholder="Enter A Comment" value={formInput.commentText} name="commentText" onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <h2>{ obj.commentAuthor }</h2>
      <Button type="submit">Add Your Comment</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    commentText: PropTypes.string,
    commentAuthor: PropTypes.string,
    commentFirebaseKey: PropTypes.string,
  }),
  foodItemFirebaseKey: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};

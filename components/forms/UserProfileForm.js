import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  FloatingLabel, Form, FormGroup, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createUserProfile, updateProfile } from '../../api/profileData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  isPublic: true,
  photoURL: '',
  address: '',
  neighborhoodID: '',
  zip: '',
  name: '',
};

function UserProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.profileFirebaseKey) setFormInput(obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (obj.profileFirebaseKey) {
      updateProfile(formInput)
        .then(() => { router.push('/profile/myProfile'); });
    } else {
      const payload = {
        ...formInput, uid: user.uid, isPublic: true,
      };
      createUserProfile(payload).then(() => {
        router.push('/profile/myProfile');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="profile-form">
      <h1>{obj.profileFirebaseKey ? 'Edit' : 'Create New'} Profile</h1>
      <FormGroup controlId="form.Input1" className="profile-form-input">
        <FloatingLabel label="Full Name">
          <Form.Control type="text" placeholder="Enter Your Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input2" className="profile-form-input">
        <FloatingLabel label="Address">
          <Form.Control type="text" placeholder="Enter Your Address" name="address" value={formInput.address} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input3" className="profile-form-input">
        <FloatingLabel label="Zip">
          <Form.Control type="text" placeholder="Enter Your Zip Code" name="zip" value={formInput.zip} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input4" className="profile-form-input">
        <FloatingLabel label="Photo URL">
          <Form.Control type="text" placeholder="Enter Your Profile Photo URL" name="photoURL" value={formInput.photoURL} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <div>
        <Button type="submit">{obj.profileFirebaseKey ? 'Update' : 'Add New'} Profile</Button>
      </div>
    </Form>
  );
}

UserProfileForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    photoURL: PropTypes.string,
    profileFirebaseKey: PropTypes.string,
    address: PropTypes.string,
    zip: PropTypes.string,
    neighborhoodID: PropTypes.string,
    isPublic: PropTypes.bool,
  }),
};

UserProfileForm.defaultProps = {
  obj: initialState,
};

export default UserProfileForm;

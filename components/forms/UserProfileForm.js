import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  FloatingLabel, Form, FormGroup, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createUserProfile, updateProfile } from '../../api/profileData';
import { useAuth } from '../../utils/context/authContext';
import { getNeighborhoods } from '../../api/neighborhoodData';

const initialState = {
  publicProfile: true,
  photoURL: '',
  address: '',
  neighborhood: '',
  zip: '',
  name: '',
};

function UserProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const setNeighborhoodInfo = () => {
    getNeighborhoods().then(setNeighborhoods);
  };

  useEffect(() => {
    setNeighborhoodInfo();
    if (obj.id) setFormInput(obj);
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
    if (obj.id) {
      updateProfile(formInput, user.uid)
        .then(() => { router.push('/profile/myProfile'); });
    } else {
      const payload = {
        ...formInput,
      };
      createUserProfile(payload, user.uid).then(() => {
        router.push('/profile/myProfile');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="profile-form">
      <h1>{obj.id ? 'Edit' : 'Create New'} Profile</h1>
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
        <FloatingLabel label="Photo URL">
          <Form.Control type="text" placeholder="Enter Your Profile Photo URL" name="photoURL" value={formInput.photoURL} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <Form.Select controlId="floatingSelect" aria-label="neighborhood select" name="neighborhood" onChange={handleChange} className="profile-form-input">
        <option value="">Select a Category</option>
        {neighborhoods?.map((neighborhood) => (
          <option key={neighborhood.id} value={neighborhood.id} selected={formInput.neighborhood === neighborhood.id}>
            {neighborhood.name}
          </option>
        ))}
      </Form.Select>
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Add New'} Profile</Button>
      </div>
    </Form>
  );
}

UserProfileForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    photoURL: PropTypes.string,
    uid: PropTypes.string,
    address: PropTypes.string,
    neighborhood: PropTypes.number,
    isPublic: PropTypes.bool,
  }),
};

UserProfileForm.defaultProps = {
  obj: initialState,
};

export default UserProfileForm;

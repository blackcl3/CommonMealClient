import React, { useEffect, useState } from 'react';
import { getSingleUserObj, getSingleUserProfile } from '../../api/profileData';
import MyProfileCard from '../../components/MyProfileCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyProfilePage() {
  const [profileObj, setProfileObj] = useState({});
  const { user } = useAuth();

  const getUserProfile = () => {
    getSingleUserProfile(user.uid).then((response) => getSingleUserObj(response[0].profileFirebaseKey)).then(setProfileObj);
  };

  useEffect(() => {
    getUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyProfileCard obj={profileObj} />
  );
}

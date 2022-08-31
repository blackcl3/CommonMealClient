import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUserObj } from '../../../api/profileData';
import UserProfileForm from '../../../components/forms/UserProfileForm';

export default function EditPage() {
  const [editProfile, setProfile] = useState({});
  const router = useRouter();
  const { profileFirebaseKey } = router.query;

  useEffect(() => {
    getSingleUserObj(profileFirebaseKey).then(setProfile);
  }, [profileFirebaseKey]);

  return (
    <UserProfileForm obj={editProfile} />
  );
}

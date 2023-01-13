import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUserProfile } from '../../../api/profileData';
import UserProfileForm from '../../../components/forms/UserProfileForm';

export default function EditPage() {
  const [editProfile, setProfile] = useState({});
  const router = useRouter();
  const { profileID } = router.query;

  useEffect(() => {
    getSingleUserProfile(profileID).then(setProfile);
  }, [profileID]);

  return (
    <div className="profile-form-container">
      <UserProfileForm obj={editProfile} />
    </div>
  );
}

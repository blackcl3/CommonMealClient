import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUserProfile } from '../../../api/profileData';
import UserProfileForm from '../../../components/forms/UserProfileForm';

export default function EditPage() {
  const [editProfile, setProfile] = useState({});
  const router = useRouter();
  const { profile } = router.query;

  useEffect(() => {
    const abortController = new AbortController();
    getSingleUserProfile(profile).then(setProfile);
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="profile-form-container">
      <UserProfileForm obj={editProfile} />
    </div>
  );
}

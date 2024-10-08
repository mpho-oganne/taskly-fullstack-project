import React, { useState, useEffect } from 'react';
import Profile from './profile';

function ProfileInter() {
  const [name, setName] = useState('Name Surname');
  const [password, setPassword] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/user/profile', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const updatedProfile = { name, password };
      const response = await fetch('/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedProfile),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <Profile
      name={name}
      password={password}
      setName={setName}
      setPassword={setPassword}
      isEditingName={isEditingName}
      setIsEditingName={setIsEditingName}
      isEditingPassword={isEditingPassword}
      setIsEditingPassword={setIsEditingPassword}
      handleSave={handleSave}
    />
  );
}

export default ProfileInter;
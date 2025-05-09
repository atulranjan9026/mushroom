import React from 'react';
import { useUser } from '../context/UserContext';
import { useUserData } from '../hooks/useUserData';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Using Context
  const { user: contextUser, isAdmin } = useUser();
  
  // Using Custom Hook
  const { userName, userEmail, userRole } = useUserData();
  
  // Using Redux directly
  const { user: reduxUser } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>User Profile</h2>
      
      {/* Using Context */}
      <div>
        <h3>Context API Data:</h3>
        <p>Name: {contextUser?.name}</p>
        <p>Role: {isAdmin ? 'Admin' : 'User'}</p>
      </div>

      {/* Using Custom Hook */}
      <div>
        <h3>Custom Hook Data:</h3>
        <p>Name: {userName}</p>
        <p>Email: {userEmail}</p>
        <p>Role: {userRole}</p>
      </div>

      {/* Using Redux */}
      <div>
        <h3>Redux Data:</h3>
        <p>Name: {reduxUser?.name}</p>
        <p>Email: {reduxUser?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile; 
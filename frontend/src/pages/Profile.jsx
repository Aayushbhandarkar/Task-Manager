import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">User Information</h2>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Username: </span>
                <span className="font-medium">{currentUser.username}</span>
              </div>
              <div>
                <span className="text-gray-600">User ID: </span>
                <span className="font-medium">{currentUser.userId}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">App Information</h2>
            <p className="text-gray-600">
              This is a task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) and features JWT authentication for secure user access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

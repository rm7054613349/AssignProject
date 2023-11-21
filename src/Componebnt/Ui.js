import React, { useState, useEffect } from 'react';
import './ui.css'; // Import a separate CSS file for animations

const Card = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setProfileData(data.results[0]);
        } else {
          console.error('Invalid API response:', data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r  bg-black">
      {profileData ? (
        <div className="bg-white p-8 rounded-md shadow-md animate-fade-in max-h-1/2 w-96">
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-black-500">
              <img
                src={profileData.picture.large}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-black-700">{`${profileData.name.first} ${profileData.name.last}`}</h2>
              <p className="text-gray-700">{`Gender: ${profileData.gender}`}</p>
              <p className="text-gray-700">{`Phone: ${profileData.phone}`}</p>
            </div>
          </div>
         
        </div>
      ) : (
        <p className="text-center text-white">Loading profile...</p>
      )}
    </div>
  );
};

export default Card;

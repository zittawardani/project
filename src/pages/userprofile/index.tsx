import React from 'react';
import Profile from '../profile';
import Sidebar from '../sidebar';

const userData = {
  id: '08954657382',
  name: 'Ramzi Dafa',
  email: 'ramzi@gmail.com',
  phone: '087654567876',
  emailVerified: true,
  items: [],
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXb4pT4uOsvRQYT4H9MI9TwfkMAMRHXWscAw&s',
  type: 'blockchain'
};

const Home: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-6">
        <Profile user={userData} />
      </main>
    </div>
  );
};

export default Home;

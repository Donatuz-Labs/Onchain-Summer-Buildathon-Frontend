import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import image from '../../assets/donatuz-logo-white.png';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 1000); 

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="h-full flex flex-col bg-splash bg-cover bg-center">
      <div className="flex lg:flex-row flex-col items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <img className="flex h-20 w-70 rounded-3" src={image} alt="Welcome" />
      </div>
    </div>
  );
};

export default Splash;

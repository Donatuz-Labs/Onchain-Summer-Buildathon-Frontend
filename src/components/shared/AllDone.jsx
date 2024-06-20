import React, { useState, useEffect, useCallback } from 'react';
import image from '../../assets/mdi_tick-circle.png';


const AllDone = ({text}) => {
  return(
    <div className="h-full flex flex-col bg-splash bg-cover bg-center">
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <img className="flex h-20 w-20 md:h-30 md:w-30 rounded-3" src={image} alt="AllDone" />
        <h1 className="flex text-center justify-center font-bold text-5-5 md:text-7 text-white leading-natural -tracking-0-6 w-full">
          All Done!
        </h1>
      </div>
    </div>
  );
};

export default AllDone;

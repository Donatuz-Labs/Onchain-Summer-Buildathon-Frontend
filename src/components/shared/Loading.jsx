import React from "react";
import LoadingSpin from '../../assets/svg/loading-spin.svg';

export default function LoadingSpinner() {
  return (
   <div className="flex justify-center items-center mx-auto mt-48 mb-48 lg:mt-72 lg:mb-72">
      <img src={LoadingSpin} alt="React Logo" className="w-4 h-4 animate-spin lg:h-14 lg:w-14 text-primary fill-primary" />
   </div>
  );
}
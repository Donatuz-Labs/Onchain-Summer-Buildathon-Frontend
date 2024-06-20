import React from 'react';

export default function Client({ className }) {
  if (className === "fill") {
    return (
      <svg width="45px" height="45px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#171717">

      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

      <g id="SVGRepo_iconCarrier"> <g id="User / User_02"> <path id="Vector" d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" fill="#171717" strokeWidth="0.72" stroke-linecap="round" stroke-linejoin="round"/> </g> </g>

      </svg>
  
    );
  } else {
    return (
      <svg width="45px" height="45px" viewBox="0 0 24.00 24.00" fill='#fff' xmlns="http://www.w3.org/2000/svg" stroke="#171717">

      <g id="SVGRepo_bgCarrier" strokeWidth="0" fill='#fff'/>
      
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" fill='#fff'/>
      
      <g id="SVGRepo_iconCarrier"> <g id="User / User_02"> <path id="Vector" d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="#171717" strokeWidth="0.80" stroke-linecap="round" fill='#fff' stroke-linejoin="round"/> </g> </g>
      
      </svg>
    )
  }
}


import React from 'react';

const Media = ({ media }) => {
  return (
    <div className="w-full mt-3 px-3 overflow-y-scroll h-96">
      <div className="grid grid-cols-3 gap-1">
        {media.map((item, index) => (
          item.type === 'video' ? (
            <video key={index} src={item.src} controls className="w-full h-full rounded-1" />
          ) : (
            <img key={index} src={item.src} alt={`media-${index}`} className="w-full h-full rounded-3" />
          )
        ))}
      </div>
      <div className='h-20'></div>
    </div>
  );
};

export default Media;
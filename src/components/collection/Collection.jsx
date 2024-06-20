import React from 'react';

const Collection = ({ collections }) => {
  return (
    <div className="relative w-full h-full px-4 bg-personal-reverse mt-3">
      <div className="overflow-y-scroll h-full pb-20">
        {collections.map((item, index) => (
          <div key={index} className="flex mb-2">
            <img src={item.image} alt={`collection-${index}`} className="w-40 h-28 rounded-2" />
            <div className="flex flex-col justify-start ml-4">
              <h2 className="text-4 font-bold text-white">{item.title}</h2>
              <p className="text-3 text-white">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='h-14'></div>
      <div className="absolute bottom-18 left-0 w-full p-4">
        <button className="w-full py-3 bg-primary text-white rounded">
          Create a New Collection
        </button>
      </div>
    </div>
  );
};

export default Collection;

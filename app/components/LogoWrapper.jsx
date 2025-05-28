import React from 'react';

const LogoWrapper = ({ logoUrl }) => {
  if (!logoUrl) return null;

  return (
    <div className="flex justify-center mb-6 rounded-b-full relative bg-[#073891] w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
      <img
        src={logoUrl}
        alt="Logo"
        className="h-12 absolute top-0 left-0 right-0 bottom-0 m-auto scale-[1.2]"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default LogoWrapper;
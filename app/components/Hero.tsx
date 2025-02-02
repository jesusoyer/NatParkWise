import Image from 'next/image';
import headerPicture from './StateParkHeaderImage.webp';

import React from 'react'

const Hero = () => {
  return (
    <div className="relative w-full max-h-[400px] sm:max-h-[600px] md:max-h-[700px]">
    {/* Title overlay */}
    <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-2xl sm:text-4xl font-bold bg-black/50 px-4 py-2 rounded-md">
      NAT PARK WISE
    </h1>
    <p className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-2xl sm:text-4xl font-bold bg-black/50 px-4 py-2 rounded-md">The park finder app</p>
  
    {/* Hero Image */}
    <Image
      src={headerPicture}
      alt="Header picture"
      width={800}
      height={600}
      className="object-contain w-full"
      priority
    />
  </div>
  
  )
}

export default Hero

'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex items-center space-x-4'>
      <input
        accept='image/*'
        className='hidden'
        id='upload-image'
        type='file'
        onChange={handleImageChange}
      />
      {image && (
        <div className='rounded-full overflow-hidden h-10 w-10'>
          <Image
            key={image}
            src={image}
            alt='Uploaded'
            width={100}
            height={100}
            className='object-center object-cover'
          />
        </div>
      )}
      <label
        className='cursor-pointer flex items-center gap-2 text-sm'
        htmlFor='upload-image'
      >
        <UploadIcon className='h-4 w-4' />
        Choose a file
      </label>
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='17 8 12 3 7 8' />
      <line x1='12' x2='12' y1='3' y2='15' />
    </svg>
  );
}

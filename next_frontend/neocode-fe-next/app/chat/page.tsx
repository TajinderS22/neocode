import React from 'react'
import Display from '@/components/Display';
import Terminal from '@/components/Terminal';

const page = () => {
  return (
    <div className=" h-svh flex flex-col justify-between ">
      <div className=" flex-1">
        <Display />
      </div>
      <div className="">
        <Terminal />
      </div>
    </div>
  );
}

export default page
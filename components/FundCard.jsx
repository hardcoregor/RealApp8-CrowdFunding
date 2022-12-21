import Image from 'next/image';
import React from 'react'

import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'
      onClick={handleClick}
    >
      <Image
        src={image}
        width={250}
        height={250}
        alt="fund"
        className='w-full h-[158px] object-cover rounded-[15px]'
      />

    </div>
  )
}

export default FundCard
"use client"
import React from 'react'
import Button from './Button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import BookingFormModal from '../components/BookingFormModal';
const GetApp = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]" >Book now!</h2>
          <p className="regular-16 text-gray-10">Get 20% off</p>
          <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
<div onClick={handleOpenModal}>
   <Button 
        
              type="button"
              title="Click Here"
              
              variant="btn_white"
              full
            />
</div>
        
       <Link href={"tel:+91962-262-4894"}>
       <Button 
              type="button"
              title="+91 9622624894"
              icon="/phone.svg"
              variant="btn_white"
              full
            />
       </Link>
          </div>
        </div>

       
      </div>
    </section>
    <BookingFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default GetApp
import React from 'react'
import '../app/globals.css';
import  Navbar from'../components/Navbar';
import  Footer from'../components/Footer';
export default function Termsandconditions() {
  return (
  <>
  <Navbar/>
  <div className='flex w-full items-center px-10'>
  <div className="container mx-auto px-4 py-8 my-20">
      <h1 className="text-3xl font-bold mb-4">Easy Cancellation</h1>
      <p className="mb-4 text-gray-700">
      *31 days or more prior to departure date Initial Booking Amount will be forfeited . *Between 30–16 days : 75% of total tour cost will be charged as penalty. *Less than 15 days: 100% of total tour cost will be charges as penalty
      </p>
      <h1 className="text-3xl font-bold mb-4">Guaranteed Dates</h1>
      <p className="mb-4 text-gray-700">Your selected travel dates are guaranteed. In the unlikely event of seats sold out, we guarantee +/- 1/2 days from your preferred dates.</p>
      <h1 className="text-3xl font-bold mb-4">High Season</h1>
      <p className="mb-4 text-gray-700">Prices can fluctuate during peak season dates.</p>
      <h1 className="text-3xl font-bold mb-4">Booking Policy</h1>
      <p className="mb-4 text-gray-700">Initial Booking Amount - INR 8,000 per person or cancellation charges whichever is higher (non-refundable and non-transferable).</p>
      <p className="mb-4 text-gray-700">30 days prior to the departure date - 50% of the remaining tour cost.</p>
      <p className="mb-4 text-gray-700">15 days prior to the departure date - 100% of the tour cost required.</p>
      <h1 className="text-3xl font-bold mb-4">Remarks</h1>
      <p className="mb-4 text-gray-700">Limited period offer.</p>
    </div>
  </div>
  <Footer/>
  </>


  )
}

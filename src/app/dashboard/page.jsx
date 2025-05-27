'use client';

import Navbar from '../components/dashboard/Navbar';
import { useState } from 'react';
import ToggleButton from '../components/dashboard/ToggleButton';
import RekomendasiHotel from '../components/dashboard/HotelSection';
import TestimonialSection from '../components/dashboard/testimoniSection';
import FlightSection from '../components/dashboard/FlightSection';
import Benefit from '../components/dashboard/benefit';
import Footer from '../components/dashboard/footer';
// import SearchContainer from "../components/dashboard/SearchContainer";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('hotel');

  return (
    <div className="relative h-screen w-full bg-white">
      {/* Background image as background layer */}
      <img
        src="/images/background.svg"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

        <div className="z-10 sticky">
          <Navbar className="w-full" />
        </div>
      
      <div className="flex flex-col h-full">
        {/* Center SearchBox in the middle of the screen */}
        <div className="flex-grow flex items-center justify-center z-10">
          {/* <HotelSearchBox className="w-10" /> */}
          {/* <SearchContainer /> */}
        </div>

        <div className="flex-grow" /> {/* This div takes up remaining space */}
        
        {/* <div className="z-10 flex justify-center mb-4 "> Adds margin bottom */}
          {/* <ToggleButton className="" /> */}
        {/* </div> */}
        
      </div>

      <div className="z-10 flex justify-center bg-white"> {/* Adds margin bottom */}
        <FlightSection/>
      </div>

      <div className="z-10 justify-center bg-white"> {/* Adds margin bottom */}
        <RekomendasiHotel/>
      </div>

      <div className="z-10 flex justify-center bg-white"> {/* Adds margin bottom */}
        <TestimonialSection/>
      </div>

      <div className="z-10 flex justify-center bg-white"> {/* Adds margin bottom */}
        <Benefit/>
      </div>

     <Footer/>

    </div>
    
  );
}
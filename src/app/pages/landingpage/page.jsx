'use client';

import Navbar from '../../components/dashboard/Navbar';
import { useState } from 'react';
import HotelSearchBox from '../../components/dashboard/HotelSearchBox';
import FlightSearchBox from '../../components/dashboard/FlightSearchBox';
import ToggleButton from '../../components/dashboard/ToggleButton';
import RekomendasiHotel from '../../components/dashboard/HotelSection';
import TestimonialSection from '../../components/dashboard/testimoniSection';
import FlightSection from '../../components/dashboard/FlightSection';
import Benefit from '../../components/dashboard/benefit';
import Footer from '../../components/dashboard/footer';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('hotel');

  return (
    <div className="relative h-screen w-full bg-white">
      <img
        src="/images/background.svg"
        alt="background"
        className="absolute top-0 left-0 w-full h-[820px] object-cover z-0"
      />

      <div className="z-10 sticky">
        <Navbar className="w-full" />
      </div>

      <div className="flex flex-col h-full">
          {/* Tengah halaman */}
          <div className="flex items-center justify-center h-screen w-full relative z-10">
            <div className="flex flex-col items-center gap-6">
              {activeTab === 'hotel' ? (
                <HotelSearchBox className="w-full max-w-xl px-4" />
              ) : (
                <FlightSearchBox className="w-full max-w-xl px-4" />
              )}
            </div>
          </div>

        <div className="flex-grow" />

        <div className="z-10 flex justify-center mb-4">
          <ToggleButton activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>


      <div className="z-10 flex justify-center bg-white">
        <FlightSection />
      </div>

      <div className="z-10 justify-center bg-white">
        <RekomendasiHotel />
      </div>

      <div className="z-10 flex justify-center bg-white">
        <TestimonialSection />
      </div>

      <div className="z-10 flex justify-center bg-white">
        <Benefit />
      </div>

      <Footer />
    </div>
  );
}

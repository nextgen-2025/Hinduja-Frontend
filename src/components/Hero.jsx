import React from "react";
import { assets } from "../assets/assets";
import AppointmentForm from "./AppointmentForm";
import AppointmentHandler from "./AppointmentFrom/AppointmentHandler";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* --------- Header Left --------- */}
      <div className="md:w-full flex flex-col items-center justify-center gap-4 py-10 m-auto md:py-[5vw]">
        <p className="text-3xl md:text-4xl text-center lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <p>
            Simply browse through our extensive list of trusted doctors, schedule your appointment
            hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Header;

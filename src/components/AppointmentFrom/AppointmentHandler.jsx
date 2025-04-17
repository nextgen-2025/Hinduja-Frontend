import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import DoctorSelector from "./Doctor";
import SlotBooking from "./Appointment";

const API_URL = "http://localhost:4000";
const socket = io(API_URL);

function AppointmentHandler() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [step, setStep] = useState(1);

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot || !patientName) {
      alert("Please fill all required fields");
      return;
    }

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    try {
      const response = await axios.post(`${API_URL}/api/bookings`, {
        doctorId: selectedDoctor._id,
        patientName,
        date: formattedDate,
        time: selectedSlot,
      });

      if (response.status === 201) {
        alert("Slot booked successfully");
        // Reset form and go back to doctor selection
        handleBack();
      } else {
        alert("Failed to book slot");
      }
    } catch (error) {
      console.error("Booking error:", error);
      // Show more detailed error message
      alert(error.response?.data?.message || "Failed to book slot. Please try again.");
    }
  };

  const handleBack = () => {
    setStep(1);
    setSelectedDoctor(null);
    setPatientName("");
    setSelectedSlot("");
    setSelectedDate("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Progress Steps with Back Button */}
      <div className="mb-6 flex items-center">
        {step === 2 && (
          <button
            onClick={handleBack}
            className="mr-4 flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                step === 1 ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'
              }`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">Select Doctor</div>
            </div>
            <div className="flex-1 mx-4 h-0.5 bg-gray-200">
              <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`ml-2 text-sm font-medium ${step === 2 ? 'text-gray-700' : 'text-gray-400'}`}>
                Book Slot
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className={`transition-all duration-300 ${step === 2 ? 'animate-slideDown' : ''}`}>
          {step === 1 ? (
            <DoctorSelector
              setSelectedDoctor={(doctor) => {
                setSelectedDoctor(doctor);
                setStep(2);
              }}
            />
          ) : (
            <SlotBooking
              doctor={selectedDoctor}
              patientName={patientName}
              setPatientName={setPatientName}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onBook={handleBooking}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentHandler;

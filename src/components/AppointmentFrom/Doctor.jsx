import React, { useState } from 'react';

const DOCTORS_DATA = [
  {
    _id: "1",
    name: "John Smith",
    specialization: "Cardiologist",
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
  },
  {
    _id: "2",
    name: "Sarah Johnson",
    specialization: "Cardiologist",
    availableSlots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"]
  },
  {
    _id: "3",
    name: "Michael Brown",
    specialization: "Neurologist",
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    _id: "4",
    name: "Emily Davis",
    specialization: "Pediatrician",
    availableSlots: ["08:00 AM", "09:00 AM", "10:00 AM", "03:00 PM", "04:00 PM"]
  },
  {
    _id: "5",
    name: "David Wilson",
    specialization: "Orthopedic",
    availableSlots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
  },
  {
    _id: "6",
    name: "Lisa Anderson",
    specialization: "Dermatologist",
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
  },
  {
    _id: "7",
    name: "Robert Taylor",
    specialization: "Ophthalmologist",
    availableSlots: ["08:30 AM", "09:30 AM", "10:30 AM", "02:30 PM", "03:30 PM"]
  },
  {
    _id: "8",
    name: "Jennifer Martinez",
    specialization: "Pediatrician",
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  }
];

const DoctorSelector = ({
  setSelectedDoctor
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Group doctors by specialization
  const doctorsBySpecialty = DOCTORS_DATA.reduce((acc, doctor) => {
    const specialty = doctor.specialization || 'General Physician';
    if (!acc[specialty]) {
      acc[specialty] = [];
    }
    acc[specialty].push(doctor);
    return acc;
  }, {});

  const specialties = Object.keys(doctorsBySpecialty);

  return (
    <div className="p-4 rounded-lg shadow-sm bg-white">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Select Doctor</h2>
        <p className="text-xs text-gray-500">Choose your preferred doctor by specialty</p>
      </div>

      {/* Specialty Selection */}
      <div className="mb-4 -mx-1">
        <div className="flex flex-wrap gap-1.5 px-1">
          <button
            onClick={() => setSelectedSpecialty("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all
              ${selectedSpecialty === "all"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            All
          </button>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all
                ${selectedSpecialty === specialty
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {specialty} ({doctorsBySpecialty[specialty].length})
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="max-h-[360px] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(doctorsBySpecialty)
            .filter(([specialty]) => 
              selectedSpecialty === "all" || specialty === selectedSpecialty
            )
            .map(([specialty, doctors]) => 
              doctors.map((doctor) => (
                <button
                  key={doctor._id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className="group p-2.5 border rounded-md hover:border-blue-500 hover:bg-blue-50 transition-all bg-white text-left w-full"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <div className="font-medium text-sm truncate group-hover:text-blue-600">
                          Dr. {doctor.name}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <svg className="w-2 h-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="10"/>
                          </svg>
                          <span className="text-[10px] text-gray-400">{doctor.availableSlots.length} slots</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {doctor.specialization}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSelector;
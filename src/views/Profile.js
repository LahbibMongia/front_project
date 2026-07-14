import React, { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext.js";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const getStatusStyle = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    finished: "bg-blueGray-100 text-blueGray-700"
  };

  return styles[status.toLowerCase()] || "bg-blueGray-100 text-blueGray-700";

};

export default function Profile() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // TODO: Connect to backend. E.g., fetch('/api/reservations').then(res => res.json()).then(data => setReservations(data))
    const fetchReservations = async () => {
      try {
        // Simulating an API call with mocked data
        const mockBackendData = [
          {
            id: 1,
            sitterName: "Emily Chen",
            dateTime: "Friday, Oct 24 • 6:00 PM - 10:00 PM",
            status: "Confirmed",
            imgSrc: require("assets/img/team-3-800x800.jpg").default
          },
          {
            id: 2,
            sitterName: "Michael Scott",
            dateTime: "Tuesday, Oct 28 • 3:00 PM - 6:00 PM",
            status: "Pending",
            imgSrc: require("assets/img/team-1-800x800.jpg").default
          }
        ];
        
        setReservations(mockBackendData);
      } catch (error) {
        console.error("Failed to fetch reservations from the backend", error);
      }
    };

    fetchReservations();
  }, []);

  return (

    
    <>
      <style>{`
        .hover-scale-102 {
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
      <Navbar transparent />
      <div className="bg-blueGray-50 min-h-screen pb-16 pt-24">
        {/* Header & Navigation */}
        <header className="shadow-sm py-4 px-6 mb-8 mt-0 w-full flex justify-between items-center relative z-10" style={{ borderRadius: "0 0 10px 10px" }}>
  <div className="container mx-auto max-w-4xl flex justify-end items-center gap-12">
    
    {/* Search Bar */}
    <div className="relative w-72 shrink-0">
      <span className="z-10 h-full font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-xs items-center justify-center w-10 flex">
        <i className="fas fa-search"></i>
      </span>
      <input
        type="text"
        placeholder="Find a babysitter"
        className="border border-blueGray-200 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-xs shadow-sm outline-none focus:outline-none focus:border-blueGray-800 focus:ring-1 focus:ring-blueGray-800 w-full pl-10 transition-colors"
        style={{ borderRadius: "10px" }}
      />
    </div>

    {/* Notification & Action Button Container */}
    <div className="flex items-center gap-8">
      <button className="text-blueGray-400 hover:text-blueGray-600 transition-colors w-8 h-8 flex items-center justify-center outline-none focus:outline-none shrink-0 relative">
        <i className="fas fa-bell text-base absolute"></i>
      </button>

      <button className="hover-scale-102 bg-blueGray-800 text-white active:bg-blueGray-900 font-bold uppercase text-xs px-6 py-2 shadow hover:shadow-md outline-none focus:outline-none shrink-0" style={{ borderRadius: "8px" }}>
        Book a Sitter
      </button>
    </div>

  </div>
</header>

        <main className="container mx-auto px-4 max-w-4xl flex flex-col gap-100">
          
          {/* Main Profile Card (Household Section) */}
          <div className="bg-white shadow-lg p-6 sm:p-8" style={{ borderRadius: "10px" }}>
            <h2 className="text-xl font-bold text-blueGray-800 mb-6 border-b border-blueGray-100 pb-3 pl-4">Household Profile</h2>
            
            <div className="flex flex-col sm:flex-row gap-8 pl-4">
              {/* Profile Photo & Edit Button */}
              <div className="flex flex-col items-center sm:items-start flex-shrink-0">
                <div className="relative mb-4">
                  <img
                    alt="Profile Avatar"
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-md h-20 w-20 object-cover border-none mx-auto"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <button className="text-xs font-bold text-blueGray-500 hover:text-blueGray-800 transition-colors uppercase outline-none focus:outline-none pt-2 text-center w-full sm:text-left">
                  Edit Photo
                </button>
              </div>

              {/* Account Information */}
              <div className="flex flex-col w-full gap-4 pl-0 sm:pl-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full sm:w-1/2 gap-1">
                    <label className="text-xs font-bold text-blueGray-500 uppercase tracking-wide">Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name || ""} 
                      className="appearance-none block w-full bg-white text-blueGray-800 border border-blueGray-200 py-3 px-4 text-sm focus:outline-none focus:border-blueGray-800 focus:ring-1 focus:ring-blueGray-800 shadow-sm transition-colors" 
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2 gap-1">
                    <label className="text-xs font-bold text-blueGray-500 uppercase tracking-wide">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || ""} 
                      className="appearance-none block w-full bg-white text-blueGray-800 border border-blueGray-200 py-3 px-4 text-sm focus:outline-none focus:border-blueGray-800 focus:ring-1 focus:ring-blueGray-800 shadow-sm transition-colors" 
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="text-xs font-bold text-blueGray-500 uppercase tracking-wide">Phone</label>
                  <input 
                    type="tel" 
                    defaultValue={user?.tel || ""} 
                    className="appearance-none block w-full bg-white text-blueGray-800 border border-blueGray-200 py-3 px-4 text-sm focus:outline-none focus:border-blueGray-800 focus:ring-1 focus:ring-blueGray-800 shadow-sm transition-colors" 
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="text-xs font-bold text-blueGray-500 uppercase tracking-wide">Address</label>
                  <input 
                    type="address" 
                    defaultValue={user?.adresse || ""} 
                    className="appearance-none block w-full bg-white text-blueGray-800 border border-blueGray-200 py-3 px-4 text-sm focus:outline-none focus:border-blueGray-800 focus:ring-1 focus:ring-blueGray-800 shadow-sm transition-colors" 
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                {/* Preferences */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-blueGray-400 uppercase tracking-widest mb-3">Preferences</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blueGray-100 text-blueGray-700 text-xs font-bold px-4 py-2" style={{ borderRadius: "20px" }}>
                      Educational games
                    </span>
                    <span className="bg-blueGray-100 text-blueGray-700 text-xs font-bold px-4 py-2" style={{ borderRadius: "20px" }}>
                      Outdoor play
                    </span>
                    <span className="bg-blueGray-100 text-blueGray-700 text-xs font-bold px-4 py-2" style={{ borderRadius: "20px" }}>
                      Arts & Crafts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Children Summary */}
          <div className="bg-white shadow-lg p-6 sm:p-8" style={{ borderRadius: "10px" }}>
            <div className="flex justify-between items-center mb-6 border-b border-blueGray-100 pb-3 pl-4 pr-4">
              <h2 className="text-xl font-bold text-blueGray-800">My Children</h2>
              <button className="text-sm font-bold text-blueGray-500 hover:text-blueGray-800 transition-colors uppercase outline-none focus:outline-none">
                + Add Child
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-40">
              <div className="flex items-center gap-4 p-4 bg-white transition-all duration-200" style={{ borderRadius: "10px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
                <div className="bg-lightBlue-100 text-lightBlue-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm font-bold text-xl relative">
                  S
                </div>
                <div className="flex flex-col pl-4">
                  <h4 className="font-bold text-blueGray-800 text-lg mb-0 relative top-1">Sarah</h4>
                  <p className="text-sm font-semibold text-blueGray-500 relative bottom-1">4 years old</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white transition-all duration-200" style={{ borderRadius: "10px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
                <div className="bg-teal-100 text-teal-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm font-bold text-xl relative">
                  L
                </div>
                <div className="flex flex-col pl-4">
                  <h4 className="font-bold text-blueGray-800 text-lg mb-0 relative top-1">Leo</h4>
                  <p className="text-sm font-semibold text-blueGray-500 relative bottom-1">Toddler</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="bg-white shadow-lg p-6 sm:p-8" style={{ borderRadius: "10px" }}>
            <h2 className="text-xl font-bold text-blueGray-800 mb-6 border-b border-blueGray-100 pb-3 pl-4">Upcoming Reservations</h2>
            
            <div className="flex flex-col gap-4">
              {reservations.map((res) => (
                <div key={res.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white gap-4" style={{ borderRadius: "10px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
                  <div className="flex items-center gap-4">
                    <div className="bg-blueGray-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img 
                        alt="..." src={res.imgSrc} 
                        className="shadow-md rounded-full h-full w-full object-cover border-none"
                      />
                    </div>
                    <div className="pl-4">
                      <h4 className="font-bold text-blueGray-800 mb-1">{res.sitterName}</h4>
                      <p className="text-sm font-semibold text-blueGray-500">
                        <i className="far fa-calendar-alt mr-2"></i>
                        {res.dateTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-auto">
                    <span
                      className={`${getStatusStyle(res.status)} text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide self-start sm:self-end`}
                    >
                      {res.status}
                    </span>
                    <a href="#pablo" onClick={e => e.preventDefault()} className="hover-scale-102 text-sm font-bold text-blueGray-500 hover:text-blueGray-800 uppercase pt-1 inline-block">
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
          </div>

        </main>
      </div>
      <Footer />
    </>
  );
}

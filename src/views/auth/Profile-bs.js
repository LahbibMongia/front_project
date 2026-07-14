import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "context/AuthContext.js";
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer";

export default function Profile() {
        const history = useHistory();
        const { user } = useAuth();

        const [showReservationModal, setShowReservationModal] = useState(false);
        const [reservationData, setReservationData] = useState({
        date: "",
        timeSlot: "",
        notes: "",
        children: []
        });
        const [successMessage, setSuccessMessage] = useState("");


        const handleSubmitReservation = async () => {
  try {
    const reservation = {
      sitterId: "sitter_jenna_456", // dynamic later
      parentId: user ? user._id : "parent_mark_789",  // from auth
      date: new Date(reservationData.date),
      timeSlot: reservationData.timeSlot,
      notes: reservationData.notes,
      children: reservationData.children,
      status: "pending",
      totalPrice: 80,
    };

    // API call (adjust URL)
    await fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    setSuccessMessage("Request sent! Babysitter will respond soon.");
    setShowReservationModal(false);
  } catch (error) {
    console.error(error);
  }
};
    return (
        <>
            <Navbar transparent />
            {/* Reservation Modal */}
            {showReservationModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
      {/* Close button */}
      <button
        onClick={() => setShowReservationModal(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
      >
        ×
      </button>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center"> Book this Babysitter</h3>
        <p className="text-sm text-gray-500 text-center">
          Select a date and describe your needs. The babysitter will respond within 24h.
        </p>

        <div className="space-y-3">
          {/* Date */}
          <input
            type="date"
            className="w-full border border-gray-200 focus:border-lightBlue-500 focus:ring-1 focus:ring-lightBlue-500 rounded-lg p-3 outline-none transition"
            onChange={(e) =>
              setReservationData({ ...reservationData, date: e.target.value })
            }
          />

          {/* Time Slot */}
          <input
            type="text"
            placeholder="Time (e.g. 18:00 - 22:00)"
            className="w-full border border-gray-200 focus:border-lightBlue-500 focus:ring-1 focus:ring-lightBlue-500 rounded-lg p-3 outline-none transition"
            onChange={(e) =>
              setReservationData({ ...reservationData, timeSlot: e.target.value })
            }
          />

          {/* Notes */}
          <textarea
            placeholder="Describe your needs..."
            className="w-full border border-gray-200 focus:border-lightBlue-500 focus:ring-1 focus:ring-lightBlue-500 rounded-lg p-3 outline-none transition"
            onChange={(e) =>
              setReservationData({ ...reservationData, notes: e.target.value })
            }
          />

          {/* Children */}
          <div>
            <label className="block font-semibold mb-2">Select Children:</label>
            <div className="flex flex-wrap gap-2">
              {["child1", "child2", "More than 2 children"].map((child) => (
                <label
                  key={child}
                  className={`px-3 py-1 rounded-full border cursor-pointer text-sm ${
                    reservationData.children.includes(child)
                      ? "bg-lightBlue-500 text-white border-lightBlue-500"
                      : "bg-gray-100 text-gray-600 border-transparent"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={child}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReservationData({
                          ...reservationData,
                          children: [...reservationData.children, child],
                        });
                      } else {
                        setReservationData({
                          ...reservationData,
                          children: reservationData.children.filter((c) => c !== child),
                        });
                      }
                    }}
                  />
                  {child}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          className="flex-1 bg-red-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition"
          onClick={() => setShowReservationModal(false)}
        >
          Cancel
        </button>

        <button
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition"
          onClick={handleSubmitReservation}
        >
          Send Request
        </button>
      </div>
    </div>
  </div>
)}
            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1497366247376-ebfdbb2b4968?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-20 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{
                            transform: "translateZ(0)",
                        }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-visible w-full h-70-px"
                            preserveAspectRatio="none"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src={require("assets/img/team-2-800x800.jpg").default}
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -top-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-end">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button
                                                className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none"
                                                type="button"
                                                onClick={() => setShowReservationModal(true)}
                                            >
                                                + Book this babysitter
                                            </button>
                                            {successMessage && (
                                                <p className="text-green-600 mt-2">{successMessage}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    22
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Bookings Completed
                                                </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    6
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Years Experience
                                                </span>
                                            </div>
                                            <div className="p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    4.9
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Rating
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Mayssa Hmidi
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Tunis
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        Certified Early Childhood Educator | CPR & First Aid Certified
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        B.A. in Child Psychology, State University
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-6">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                With over 6 years of professional childcare experience, I specialize in creating a safe, engaging, and educational environment for children ages 2-10. My approach combines structured learning with creative play, ensuring your little ones are not just supervised, but truly inspired.
                                                Beyond my background in Child Psychology, I am fully background-checked and hold up-to-date certifications in pediatric CPR. Whether it’s managing bedtime routines, assisting with homework, or organizing weekend outdoor activities, my goal is to provide parents with total peace of mind.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-6 px-3 mt-8 sm:mt-0 flex justify-center">
                                    <button
                                        className=" active:bg-blueGray-900 uppercase text-blueGray-900 font-bold hover:shadow-lg shadow text-blueGray-900 px-8 py-1 outline-none focus:outline-none ease-linear transition-all duration-150 border-2 border-blueGray-900"
                                        style={{ borderRadius: "10px" }}
                                        type="button"
                                        onClick={() => history.push("/edit-profile-bs")}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

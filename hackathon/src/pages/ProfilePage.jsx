import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import { gsap } from "gsap"; // Import GSAP

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Access currentUser from Redux store
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      setError("User is not logged in.");
      return;
    }

    // Fetch the user data when the component is mounted
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/profile?email=${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`, // Use the token from currentUser
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Something went wrong. Please try again.");
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  // GSAP animations for profile details
  useEffect(() => {
    if (userData) {
      gsap.from(".profile-details", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
      });
      gsap.from(".profile-details > div", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [userData]);

  return (
    <div className="profile-page px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
        User Profile
      </h2>

      {error && (
        <div className="bg-red-500 text-white text-center p-3 rounded mb-4 shadow-lg">
          {error}
        </div>
      )}

      {userData ? (
        <div className="profile-details space-y-4">
          <div className="profile-item">
            <strong className="text-lg font-medium">First Name:</strong>{" "}
            {userData.firstname}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Last Name:</strong>{" "}
            {userData.lastname}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Date of Birth:</strong>{" "}
            {new Date(userData.dob).toLocaleDateString()}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Nationality:</strong>{" "}
            {userData.nationality}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Email:</strong>{" "}
            {userData.email}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Phone:</strong>{" "}
            {userData.phone}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Gender:</strong>{" "}
            {userData.gender}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Address:</strong>{" "}
            {userData.address}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">City:</strong>{" "}
            {userData.city}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">State:</strong>{" "}
            {userData.state}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Pincode:</strong>{" "}
            {userData.pincode}
          </div>

          <h3 className="mt-6 text-xl font-semibold text-indigo-600">
            Educational Details
          </h3>
          <div className="profile-item">
            <strong className="text-lg font-medium">High School:</strong>{" "}
            {userData.highschool.board} ({userData.highschool.year}) - Marks:{" "}
            {userData.highschool.marks}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Intermediate:</strong>{" "}
            {userData.intermediate.board} ({userData.intermediate.year}) -
            Marks: {userData.intermediate.marks}
          </div>
          <div className="profile-item">
            <strong className="text-lg font-medium">Graduation:</strong>{" "}
            {userData.graduation.board} ({userData.graduation.year}) - Marks:{" "}
            {userData.graduation.marks}
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">Loading user profile...</div>
      )}
    </div>
  );
};

export default ProfilePage;

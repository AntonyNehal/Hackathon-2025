import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
function About() {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    // GSAP animation for zoom-in effect on load
    gsap.fromTo(
      headerRef.current,
      { scale: 1.8, opacity: 0 },
      { scale: 0.9, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);
  useEffect(() => {
    // GSAP animation: Fade in and slide the image from the right
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 500 },
      { opacity: 1, x: 0, duration: 2.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div>
      <header
        ref={headerRef}
        className="flex flex-col justify-end text-black"
        style={{
          backgroundImage:
            "url('https://jkadworld.com/wp-content/uploads/2024/09/DRDO.webp')",
          backgroundSize: "100% auto", // Fits the width fully and adjusts height automatically
          backgroundPosition: "top centre", // Keeps the focus at the top of the image
          backgroundRepeat: "no-repeat",
          height: "750px",
          position: "relative",
          width: "100%",
          clipPath: "inset(10% 0% 0% 0%)",
        }}
      >
        <nav className="flex items-center justify-between bg-transparent p-4">
          <div className="text-3xl font-bold">
            <Link to="/" className="text-white">
              DRDO
            </Link>
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-white hover:underline text-2xl font-semibold"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="text-white hover:underline text-2xl font-semibold"
              >
                Apply Job
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white hover:underline text-2xl font-semibold"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8">
          {/* Text Section */}
          <div className="md:w-2/3 text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              About DRDO
            </h1>
            <p className="text-justify text-lg leading-relaxed text-gray-700 font-sans">
              The Defence Research and Development Organisation (DRDO) is the
              R&D wing of the Ministry of Defence, Government of India. It
              envisions empowering India with cutting-edge defence technologies
              and aims to achieve self-reliance in critical defence systems
              while equipping the armed forces with state-of-the-art weaponry
              and equipment, in accordance with the requirements of the three
              Services.
            </p>

            <p className="text-justify text-lg leading-relaxed text-gray-700 font-sans mt-4">
              DRDO's pursuit of self-reliance has resulted in the successful
              indigenous development of strategic systems such as the Agni and
              Prithvi missile series, the Tejas light combat aircraft, the
              Pinaka multi-barrel rocket launcher, and the Akash air defence
              system. These advancements have provided India with significant
              military strength.
            </p>

            <p className="text-justify text-lg leading-relaxed text-gray-700 font-sans mt-4">
              Guided by the motto{" "}
              <span className="font-bold italic">"Balasya Mulam Vigyanam"</span>
              , meaning "The source of strength is science," DRDO remains
              committed to making India self-reliant in military technologies.
            </p>
          </div>

          {/* Image Section with GSAP Animation */}
          <div className="md:w-1/3 flex justify-center">
            <img
              ref={imageRef}
              src="https://www.drdo.gov.in/drdo/sites/default/files/inline-images/drdo.PNG"
              alt="DRDO"
              className="w-full max-w-sm shadow-lg rounded-lg"
            />
          </div>
        </div>
      </>
    </div>
  );
}
export default About;

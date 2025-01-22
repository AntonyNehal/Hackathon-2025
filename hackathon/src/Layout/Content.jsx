import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function Content({ activeData }) {
  // Refs for elements to animate
  const headingRef = useRef();
  const subHeadingRef = useRef();
  const textRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        color: activeData?.headingColor || "#000", // Apply heading color
        ease: "power4.out",
        duration: 1,
      }
    );

    // Animate subheading
    gsap.fromTo(
      subHeadingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        color: activeData?.headingColor || "#000", // Apply subheading color
        ease: "power4.out",
        duration: 1,
        delay: 0.2,
      }
    );

    // Animate text
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        color: activeData?.headingColor || "#000", // Apply text color
        ease: "power4.out",
        duration: 1,
        delay: 0.4,
      }
    );

    gsap.fromTo(
      buttonRef.current,
      {
        y: 100, // Start position (100px below)
        opacity: 0,
        color: "#fff", // Start color (white)
      },
      {
        y: 0, // Move to normal position
        opacity: 1,
        color: activeData?.buttonColor?.text || "#000", // Target color
        backgroundColor: activeData?.buttonColor?.background || "#4A6E6A",
        ease: "power4.out",
        duration: 1,
        delay: 0.6, // Slight delay for staggered effect
      }
    );
  }, [activeData]);

  return (
    <div className="select-none w-full h-2/5 flex justify-center items-center lg:w-1/2 lg:h-full lg:justify-end">
      <div className="flex justify-start flex-col items-start w-2/3">
        <h1
          ref={headingRef}
          className="text-left text-5xl font-bold mb-1 w-full relative p-1 overflow-hidden md:text-[7vw] md:md-2"
        >
          {activeData.heading}
        </h1>
        <h6
          ref={subHeadingRef}
          className="text-left text-2xl font-regular mb-6 w-full p-1 overflow-hidden md:text-4xl"
        >
          {activeData.subHeading}
        </h6>
        <p
          ref={textRef}
          className="w-full text-xs font-medium text-left mb-8 p-1 overflow-hidden md:text-base md:mb-12"
        >
          {activeData.text}
        </p>
        <div className="relative overflow-hidden p-4">
          <button
            ref={buttonRef}
            className="cursor-pointer button rounded-2xl outline-none px-8 py-2 font-medium md:px-10 md:py-4"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

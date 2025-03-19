import React, { useEffect, useRef, useState } from "react";
import AboutUs1 from "../components/About-us1";
import CallToAction from "../components/Call-to-action";
import Clients1 from "../components/Clients1";
import Footer from "../components/Footer";
import IntroWithSlider1 from "../components/Intro-with-slider1";
import Navbar from "../components/Navbar";
import Numbers1 from "../components/Numbers";
import Services1 from "../components/Services";
import SkillsCircle from "../components/Skills-circle";
import VideoWithTestimonials from "../components/Video-with-testimonials";
import Works1Slider from "../components/Works1-slider";
import DarkTheme from "../layouts/Dark";
import scrollSvg from "scroll-svg";

const ScrollConnector = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const fixedSlider = useRef(null);
  const MainContent = useRef(null);

  useEffect(() => {
    const adjustMargin = () => {
      if (fixedSlider.current && MainContent.current) {
        MainContent.current.style.marginTop = `${fixedSlider.current.offsetHeight}px`;
      }
    };

    adjustMargin(); // Run on mount
    const interval = setInterval(adjustMargin, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar"); // Get navbar using ID
    if (!navbar) return;

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    };

    handleScroll(); // Run initially
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;

    const pathLength = pathRef.current.getTotalLength();

    pathRef.current.style.strokeDasharray = pathLength;
    pathRef.current.style.strokeDashoffset = pathLength;

    scrollSvg(pathRef.current);
  }, []);

  return (

    <svg
    ref={svgRef}
    viewBox="0 0 476 927"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="scroll-svg"
  >
 <path
        ref={pathRef}
        d="M238.458 4C238.458 4 240 28.1667 245 52.5C250 76.8333 276.758 123.7 369.958 160.5C407.458 175.307 455.501 200.5 464.501 258C468.444 283.193 462 334 424 366C390.211 394.454 302.972 416.847 238.458 436C142.458 464.5 121 471.14 65.5 516C46 531.762 18.5001 559 6.99998 605C-1.63757 639.55 11.4091 672 29 693.5C65 737.5 107.235 746.5 147.5 762.5C187.765 778.5 199 786.5 199 786.5C237.5 811 238.458 860.5 238.458 860.5V916.5"
        stroke="url(#paint0_linear_2_3)"
        strokeWidth="1"
        strokeLinecap="round"

       

       
      />
       <defs>
        <linearGradient
          id="paint0_linear_2_3"
          x1="199.027"
          y1="-6.29894e-06"
          x2="285.693"
          y2="103"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
      </defs>
</svg>

    
  );
};

const Section = ({ sectionRef, children }) => (
  <div ref={sectionRef} className="section">
    {children}
  </div>
);

const Test = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  return (
    <DarkTheme>
      <Navbar id="navbar" /> {/* Ensure Navbar has an ID */}
      <Section sectionRef={sectionRefs[0]}>
        <AboutUs1 />
      </Section>
      <ScrollConnector />
      <Section sectionRef={sectionRefs[1]}>
        <Services1 />
      </Section>
      <ScrollConnector />
      <Numbers1 />


<Works1Slider />




<VideoWithTestimonials />

<SkillsCircle theme="dark" subBG />


<Clients1 theme="dark" />


<CallToAction subBG />




<Footer />
      </DarkTheme>
  );
};

export default Test;

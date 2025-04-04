import React, { useEffect, useRef, useState } from "react";
import AboutUs from "../components/About-us";
import CallToAction from "../components/Call-to-action";
import Clients from "../components/Clients";
import Footer from "../components/Footer";
import IntroWithSlider from "../components/Intro-with-slider";
import Navbar from "../components/Navbar";
import Numbers from "../components/Numbers";
import Services from "../components/Services";
import SkillsCircle from "../components/Skills-circle";
import VideoWithTestimonials from "../components/Video-with-testimonials";
import WorksSlider from "../components/Works-slider";
import DarkTheme from "../layouts/Dark";

const Homepage1 = () => {
  const fixedSlider = useRef(null);
  const MainContent = useRef(null);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    setInterval(() => {
      if (fixedSlider.current) {
        var slidHeight = fixedSlider.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [fixedSlider, MainContent, navbarRef]);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      <IntroWithSlider sliderRef={fixedSlider} />
      <div ref={MainContent} className="main-content relative">
        <AboutUs />
        <Services />
        <Numbers />
        {/* <WorksSlider /> */}
        <VideoWithTestimonials />
        <SkillsCircle theme="dark" subBG />
        <Clients theme="dark" />
        <CallToAction subBG />
        <Footer />
      </div>
    </DarkTheme>
  );
};

export default Homepage1;

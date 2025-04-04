import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Parallax, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ReactPlayer from "react-player";
import "swiper/css/mousewheel";
import projectsData from "../../data/sections/projects.json";
import removeSlashFromPagination from "../../common/removeSlashFromPagination";

SwiperCore.use([Navigation, Parallax, Mousewheel]);

const ShowcasesOneCenter = () => {
  const [load, setLoad] = useState(true);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [playing, setPlaying] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      removeSlashFromPagination();
    });
  }, []);
  const toggleVideoPlay = (videoId) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId], // Toggle play/pause state
    }));
  };

  return (
    <header className="slider showcase-carus">
      <div id="content-carousel-container-unq-1" className="swiper-container">
        {!load ? (
          <Swiper
            speed={1000}
            mousewheel={true}
            centeredSlides={true}
            autoplay={true}
            loop={true}
            spaceBetween={30}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 },
              640: { slidesPerView: 1, spaceBetween: 0 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 200 },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.slides.forEach((slide) => {
                  slide.childNodes[0].setAttribute(
                    "data-swiper-parallax",
                    0.75 * swiper.width
                  );
                });
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="swiper-wrapper"
          >
            {projectsData.slice(0, 6).map((project) => {
              const projectSlug = `/projects/${encodeURIComponent(
                project.title.toLowerCase().replace(/\s+/g, "-")
              )}`;

              return (
                <SwiperSlide key={project.id} className="swiper-slide">
                
                  
                      <div
                        className="bg-img valign"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation on click
                          setPlaying(!playing); // Toggle play/pause state
                        }}
                        style={
                          project.video
                            ? { background: "" }
                            : { backgroundImage: `url("${project.image}")` }
                        }
                        data-overlay-dark="1"
                      >
                        {project.video ? (
                          
                          <ReactPlayer
                          url={`https://vimeo.com/${project.video}`}
                          playing={playing}
                          loop
                          muted
                          width="100%"
                          height="100%"
                          style={{ position: "absolute", top: 0, left: 0 }}
                        />
                       
                        ) : null}

                        <div className="caption ontop">
                          <div className="o-hidden">
                          <h1>
                        <Link href={projectSlug}>
                          <a>
                            <div className="stroke">{project.showCase}</div>
                           
                          </a>
                        </Link>
                      </h1>
                          </div>
                        </div>

                        <div className="copy-cap valign">
                    <div className="cap">
                      <h1>
                        <Link href={projectSlug}>
                          <a>
                            <div className="stroke">{project.showCase}</div>
                           
                          </a>
                        </Link>
                      </h1>
                    </div>
                  </div>
                      </div>
                   
                  
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}

        <div className="txt-botm">
          <div style={{ display: "flex", justifyContent: "center" }}>

          
          <div
            ref={navigationPrevRef}
            className="swiper-button-prev swiper-nav-ctrl cursor-pointer"
          >
            <div>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div>
              <span className="custom-font">Prev Slide</span>
            </div>
          </div>

        <Link href="/portfolio-details">
  <a className="check-all-projects-button">All Projects</a>
</Link>

          <div
            ref={navigationNextRef}
            className="swiper-button-next swiper-nav-ctrl cursor-pointer"
          >
            <div>
              <span className="custom-font">Next Slide</span>
            </div>
            <div>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
};

export default ShowcasesOneCenter;

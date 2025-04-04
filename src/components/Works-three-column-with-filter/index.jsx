import React, { useEffect, useState } from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";

const WorksThreeColumnWithFilter = ({ filterPosition, projects }) => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    console.log("Projects Data: in works theee column", projects);
  }, [projects]);

  useEffect(() => {
    if (pageLoaded) {
      setTimeout(() => {
        initIsotope();
      }, 1000);
    }
  }, [pageLoaded]);

  return (
    <section className="portfolio section-padding pb-70">
      <div className="container">
        <div className="row">
          <div
            className={`filtering ${
              filterPosition === "center"
                ? "text-center"
                : filterPosition === "left"
                ? "text-left"
                : "text-right"
            } smplx col-12`}
          >
            <div className="filter">
              <span data-filter="*" className="active">All</span>
              <span data-filter=".Development">Development</span>
              <span data-filter=".marketing">Marketing</span>
              <span data-filter=".creatives">Creatives</span>
            </div>
          </div>

          <div className="gallery full-width">
            {projects.map((project) => (
              <div key={project.id} className={`col-lg-4 col-md-6 items ${project.category}`}>
                <div className="item-img  wow fadeInUp" data-wow-delay=".4s">
                  {project.id ? (
                   <Link href={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, "-"))}`}>
                      <img className="project-img" src={project.image} alt={project.title} />
                    </Link>
                  ) : (
                    <img src={project.image} alt={project.title} />
                  )}
                </div>
                <div className="cont">
                  <h6>{project.title}</h6>
                  <span className="d-flex" style={{gap: "14px",justifyContent: "center"}}>
                    {project.tags?.map((tag, index) => (
                      <p key={index} >{tag}</p>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksThreeColumnWithFilter;

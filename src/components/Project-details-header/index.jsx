import React from "react";
import Link from "next/link";

const ProjectDetailsHeader = ({ 
  backgroundImage, 
  category, 
  title, 
  client, 
  clientUrl, 
  date, 
  categories, 
  tags 
}) => {
  return (
    <section
      className="page-header proj-det bg-img parallaxie valign"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      data-overlay-dark="4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h6>{category}</h6>
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Client</h6>
              <p>
                <a href={clientUrl}>{client}</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Date</h6>
              <p>{date}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Categories</h6>
              <p>
                {categories.map((cat, index) => (
                  <React.Fragment key={index}>
                     <span>{cat.name}</span>
                    {index < categories.length - 1 && " , "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Tags</h6>
              <p>
                {tags.map((tag, index) => (
                  <React.Fragment key={index}>
                  {tag}
                    {index < tags.length - 1 && " , "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsHeader;

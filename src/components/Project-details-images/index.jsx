/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProjectDetailsImages = ({ images }) => {
  return (
    <section className="projdtal">
      <h2 style={{ display: "none" }}> &nbsp; </h2>
      <div className="container-fluid">
        <div className="justified-gallery">
          <div className="row">
            {images.map((image, index) => (
              <div
                key={index}
                className={`col-${image.size === "big" ? "12" : "md-6"} pr-0`}
              >
                <a href={image.src}>
                  <img
                    alt=""
                    src={image.src}
                    className={image.size === "big" ? "big-img" : ""}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsImages;

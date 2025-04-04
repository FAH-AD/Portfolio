import React, { useEffect } from "react";
import Link from "next/link";

const NextProject = ({ projectImage, projectTitle, projectSlug }) => {
  useEffect(() => {
    console.log("Next Project Data: ", projectImage, projectTitle, projectSlug);
  }, []);

  return (
    <section className="next-prog section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div
                className="bg-img valign"
                style={{ backgroundImage: `url("${projectImage}")` }}
                data-overlay-dark="4"
              >
                <div className="caption ontop valign">
                  <div className="o-hidden full-width">
                    <h1 className="hover-title">
                      <Link href={`/projects/${projectSlug}`}>
                        <span className="stroke">{projectTitle}</span>
                      </Link>
                    </h1>
                  </div>
                </div>
                <div className="copy-cap valign">
                  <div className="cap full-width">
                    <h1 className="hover-title">
                      <Link href={`/projects/${projectSlug}`}>
                        <span>{projectTitle}</span>
                      </Link>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextProject;

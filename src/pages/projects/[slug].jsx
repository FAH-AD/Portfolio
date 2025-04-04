import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DarkTheme from "../../layouts/Dark";
import Navbar from "../../components/Navbar";
import ProjectDetailsHeader from "../../components/Project-details-header";
import ProjectDetailsIntroduction from "../../components/Project-details-introduction";
import ProjectDetailsImages from "../../components/Project-details-images";
import ProjectDetailsDescription from "../../components/Project-details-description";
import ProjectDetailsVideo from "../../components/Project-details-video";
import NextProject from "../../components/Next-project";
import SmallFooter from "../../components/Small-footer";
import projectData from "../../data/sections/projects.json";

const ProjectDetails = () => {
  const router = useRouter();
  const { slug } = router.query; // Get project slug from URL
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    // Find the project based on the slug in URL
    const projectIndex = projectData.findIndex(
      (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (projectIndex === -1) {
      setProject(null); // If not found, set project as null
      return;
    }

    // Set the current project
    setProject(projectData[projectIndex]);

    // Get the next project (loop back to the first if it's the last project)
    const nextIndex = (projectIndex + 1) % projectData.length;
    setNextProject(projectData[nextIndex]);
  }, [slug]);

  useEffect(() => {
    console.log("Project Data: ", project); // Debugging log for the project data
  }, [project]);

  // Loading and error handling for project data
  if (!slug) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <DarkTheme>
      <Navbar />
      {/* Project Details Header */}
      <ProjectDetailsHeader
        backgroundImage={project.image}
        category={project.category}
        title={project.title}
        client={project.client}
        clientUrl={project.clientUrl}
        date={project.date}
        categories={project.categories}
        tags={project.tags}
      />
      {/* Project Introduction */}
      <ProjectDetailsIntroduction
        title={project.introduction.title}
        description={project.introduction.description}
        listItems={project.introduction.listItems}
      />
      {/* Project Images */}
      <ProjectDetailsImages images={project.images} />
      {/* Project Description */}
      <ProjectDetailsDescription
        title={project.description.title}
        description={project.description.text}
      />
      {/* Project Video */}
      <ProjectDetailsVideo
        videoBackground={project.videoBackground}
        videoType={project.videoType}
        videoId={project.videoId}
      />

    
     
      {/* Next Project */}
      {nextProject && (
        <NextProject
          projectImage={nextProject.image}
          projectTitle={nextProject.title}
          projectSlug={nextProject.title
            .toLowerCase()
            .replace(/\s+/g, "-")}
        />

        
      )}


       
      {/* Footer */}
      <SmallFooter />
    </DarkTheme>
  );
};

export default ProjectDetails;

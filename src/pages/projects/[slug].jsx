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

  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    console.log("slug (string):", slug);
    console.log("typeof slug:", typeof slug);
    console.log("projectData:", projectData);

    // Convert project titles into slugs and match with the URL
    const foundProject = projectData.find(
      (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
    );

    console.log("project:", foundProject);
    setProject(foundProject);
  }, [slug]);

  if (!slug) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <DarkTheme>
      <Navbar />
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
      <ProjectDetailsIntroduction
        title={project.introduction.title}
        description={project.introduction.description}
        listItems={project.introduction.listItems}
      />
      <ProjectDetailsImages images={project.images} />
      <ProjectDetailsDescription title={project.description.title} description={project.description.text} />
      <ProjectDetailsVideo videoBackground={project.videoBackground} videoType={project.videoType} videoId={project.videoId} />
      <NextProject projectImage={project.nextProject.image} projectTitle={project.nextProject.title} />
      <SmallFooter />
    </DarkTheme>
  );
};

export default ProjectDetails;

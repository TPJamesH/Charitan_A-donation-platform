import React from "react";
import HighlightProjects from "../components/Projects/HighlightProjects/HighlightProjects";
import ProjectsTable from "../components/Projects/ProjectTable/ProjectsTable"; 

const Projects = () => {
  return (
    <div>      
      {/* Highlight Projects Section */}
      <HighlightProjects />
      
      {/* Projects Table Section */}
      <ProjectsTable />
    </div>
  );
};

export default Projects;

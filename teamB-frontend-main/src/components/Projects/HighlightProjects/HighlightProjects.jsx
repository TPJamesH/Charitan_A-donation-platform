import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";

const HighlightProjects = () => {
  const [regionalProjects, setRegionalProjects] = useState([]);
  const [globalProjects, setGlobalProjects] = useState([]);
  const [isRegionalOpen, setIsRegionalOpen] = useState(false);
  const [isGlobalOpen, setIsGlobalOpen] = useState(false);
  const [regionalSearch, setRegionalSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const dummyRegionalProjects = [
    "APAC Digital Transformation",
    "European Green Initiative",
    "North American Infrastructure",
    "Latin American Education Program",
    "African Healthcare Initiative",
    "Middle East Renewable Energy"
  ];

  const dummyGlobalProjects = [
    "World Climate Action",
    "Global Tech Innovation",
    "International Education Exchange",
    "Worldwide Healthcare Access",
    "Global Economic Initiative",
    "International Peace Project"
  ];

  const filteredRegionalProjects = dummyRegionalProjects.filter(project =>
    project.toLowerCase().includes(regionalSearch.toLowerCase())
  );

  const filteredGlobalProjects = dummyGlobalProjects.filter(project =>
    project.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const handleRegionalSelect = (project) => {
    if (regionalProjects.length < 3 && !regionalProjects.includes(project)) {
      setRegionalProjects([...regionalProjects, project]);
    }
    setIsRegionalOpen(false);
    setRegionalSearch("");
  };

  const handleGlobalSelect = (project) => {
    if (globalProjects.length < 3 && !globalProjects.includes(project)) {
      setGlobalProjects([...globalProjects, project]);
    }
    setIsGlobalOpen(false);
    setGlobalSearch("");
  };

  const removeRegionalProject = (project) => {
    setRegionalProjects(regionalProjects.filter((p) => p !== project));
  };

  const removeGlobalProject = (project) => {
    setGlobalProjects(globalProjects.filter((p) => p !== project));
  };

  const clearAllSelections = () => {
    setRegionalProjects([]);
    setGlobalProjects([]);
  };

  return (
    <div className="min-h-full bg-gray-50 p-2">
      <div className="w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Highlight Charity Projects</h1>
        <p className="text-gray-600 mb-6">Select and highlight up to 3 regional and 3 global projects to feature on the homepage.</p>

        <div className="space-y-4">
          {/* Regional Projects Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Regional Projects</h3>
            <div className="relative">
              <input
                type="text"
                value={regionalSearch}
                onChange={(e) => {
                  setRegionalSearch(e.target.value);
                  setIsRegionalOpen(true);
                }}
                onClick={() => setIsRegionalOpen(true)}
                placeholder="Search Regional Projects"
                className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:border-blue-500"
                disabled={regionalProjects.length >= 3}
              />
              <IoMdArrowDropdown className="absolute right-3 top-3 text-gray-600" />

              {isRegionalOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredRegionalProjects.map((project) => (
                    <button
                      key={project}
                      onClick={() => handleRegionalSelect(project)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 disabled:bg-gray-100"
                      disabled={regionalProjects.includes(project)}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {regionalProjects.map((project) => (
                <div
                  key={project}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{project}</span>
                  <button
                    onClick={() => removeRegionalProject(project)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Global Projects Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Global Projects</h3>
            <div className="relative">
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setIsGlobalOpen(true);
                }}
                onClick={() => setIsGlobalOpen(true)}
                placeholder="Search Global Projects"
                className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:border-blue-500"
                disabled={globalProjects.length >= 3}
              />
              <IoMdArrowDropdown className="absolute right-3 top-3 text-gray-600" />

              {isGlobalOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredGlobalProjects.map((project) => (
                    <button
                      key={project}
                      onClick={() => handleGlobalSelect(project)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 disabled:bg-gray-100"
                      disabled={globalProjects.includes(project)}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {globalProjects.map((project) => (
                <div
                  key={project}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{project}</span>
                  <button
                    onClick={() => removeGlobalProject(project)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Selections Button */}
          <button
            onClick={clearAllSelections}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <MdClear size={20} />
            Clear Selections
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightProjects;

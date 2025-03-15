// Mock data
let mockProjects = [
  {
    id: "P1",
    charityId: "C123",
    title: "Clean Water Initiative",
    goalAmount: 100000,
    raisedAmount: 75000,
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "P2",
    charityId: "C124",
    title: "Food for All",
    goalAmount: 50000,
    raisedAmount: 20000,
    status: "Pending",
    startDate: "2024-03-01",
    endDate: "2024-11-30",
  },
  {
    id: "P3",
    charityId: "C125",
    title: "Housing for Families",
    goalAmount: 150000,
    raisedAmount: 100000,
    status: "Halted",
    startDate: "2023-05-01",
    endDate: "2023-12-31",
  },
];

// Mock API calls
export const fetchProjects = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter projects based on the search term
      const filteredProjects = mockProjects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filteredProjects);
    }, 500); // Simulate API latency
  });
};

export const addProject = async (project) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject = { ...project, id: `P${Date.now()}` };
      mockProjects.push(newProject);
      resolve(newProject);
    }, 500); // Simulate API latency
  });
};

export const updateProject = async (projectId, updatedProject) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProjects.findIndex((p) => p.id === projectId);
      if (index === -1) {
        return reject(new Error("Project not found"));
      }
      mockProjects[index] = { ...mockProjects[index], ...updatedProject };
      resolve(mockProjects[index]);
    }, 500); // Simulate API latency
  });
};

export const deleteProject = async (projectId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProjects.findIndex((p) => p.id === projectId);
      if (index === -1) {
        return reject(new Error("Project not found"));
      }
      const [deletedProject] = mockProjects.splice(index, 1);
      resolve(deletedProject);
    }, 500); // Simulate API latency
  });
};

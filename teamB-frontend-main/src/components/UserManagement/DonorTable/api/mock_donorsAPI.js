let mockDonors = [
    { id: "D1", name: "John Doe", totalDonations: 5000, donatedProjects: 3, subscription: "Category", region: "North America", createdDate: "2023-01-15" },
    { id: "D2", name: "Jane Smith", totalDonations: 10000, donatedProjects: 5, subscription: "Region", region: "Europe", createdDate: "2022-11-10" },
    { id: "D3", name: "Alice Johnson", totalDonations: 7500, donatedProjects: 4, subscription: "Category", region: "Asia", createdDate: "2023-03-12" },
    { id: "D4", name: "Bob Brown", totalDonations: 2000, donatedProjects: 1, subscription: "Region", region: "South America", createdDate: "2022-12-05" },
    { id: "D5", name: "Charlie Davis", totalDonations: 8500, donatedProjects: 6, subscription: "Category", region: "Australia", createdDate: "2023-02-20" },
    { id: "D6", name: "Emily Wilson", totalDonations: 3000, donatedProjects: 2, subscription: "Region", region: "Africa", createdDate: "2023-04-10" },
    { id: "D7", name: "Frank Moore", totalDonations: 12000, donatedProjects: 8, subscription: "Category", region: "Europe", createdDate: "2023-05-01" },
    { id: "D8", name: "Grace Lee", totalDonations: 4000, donatedProjects: 2, subscription: "Region", region: "Asia", createdDate: "2022-09-15" },
    { id: "D9", name: "Hank Green", totalDonations: 5500, donatedProjects: 3, subscription: "Category", region: "North America", createdDate: "2022-08-25" },
    { id: "D10", name: "Ivy White", totalDonations: 9500, donatedProjects: 7, subscription: "Region", region: "South America", createdDate: "2023-06-30" },
  ];
  
  export const fetchDonors = async () => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockDonors]), 500));
  };
  
  export const addDonor = async (donor) => {
    return new Promise((resolve) => {
      const newDonor = { ...donor, id: `D${Date.now()}` };
      mockDonors.push(newDonor);
      setTimeout(() => resolve(newDonor), 500);
    });
  };
  
  export const updateDonor = async (donorId, donor) => {
    return new Promise((resolve) => {
      mockDonors = mockDonors.map((d) => (d.id === donorId ? donor : d));
      setTimeout(() => resolve(donor), 500);
    });
  };
  
  export const deleteDonor = async (donorId) => {
    return new Promise((resolve) => {
      mockDonors = mockDonors.filter((d) => d.id !== donorId);
      setTimeout(resolve, 500);
    });
  };
  
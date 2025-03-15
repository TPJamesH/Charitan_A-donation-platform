let mockCharities = [
    { id: "C1", name: "Green Earth Initiative", address: "123 Elm St, Springfield", charityType: "Non-profit Organization", category: "Environment", numberOfProjects: 7 },
    { id: "C2", name: "Health First Foundation", address: "456 Oak Ave, Riverdale", charityType: "Company", category: "Health", numberOfProjects: 12 },
    { id: "C3", name: "Education for All", address: "789 Pine Rd, Maplewood", charityType: "Non-profit Organization", category: "Education", numberOfProjects: 5 },
    { id: "C4", name: "Food Aid Network", address: "101 Maple St, Greenville", charityType: "Person", category: "Food", numberOfProjects: 9 },
    { id: "C5", name: "Safe Shelter Homes", address: "202 Oak Ln, Summerville", charityType: "Company", category: "Housing", numberOfProjects: 6 },
    { id: "C6", name: "Relief for Refugees", address: "303 Pine Ct, Brookfield", charityType: "Non-profit Organization", category: "Humanitarian", numberOfProjects: 4 },
    { id: "C7", name: "Clean Water Project", address: "404 Cedar Blvd, Willow Creek", charityType: "Company", category: "Environment", numberOfProjects: 8 },
    { id: "C8", name: "Global Health Outreach", address: "505 Birch Ave, Oakridge", charityType: "Non-profit Organization", category: "Health", numberOfProjects: 10 },
    { id: "C9", name: "Equal Education Fund", address: "606 Spruce Dr, Fairview", charityType: "Person", category: "Education", numberOfProjects: 7 },
    { id: "C10", name: "Food Bank Alliance", address: "707 Aspen Rd, Pine Hill", charityType: "Company", category: "Food", numberOfProjects: 11 },
  ];
  
  export const fetchCharities = async () => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockCharities]), 500));
  };
  
  export const addCharity = async (charity) => {
    return new Promise((resolve) => {
      const newCharity = { ...charity, id: `C${Date.now()}` };
      mockCharities.push(newCharity);
      setTimeout(() => resolve(newCharity), 500);
    });
  };
  
  export const updateCharity = async (charityId, charity) => {
    return new Promise((resolve) => {
      mockCharities = mockCharities.map((c) => (c.id === charityId ? charity : c));
      setTimeout(() => resolve(charity), 500);
    });
  };
  
  export const deleteCharity = async (charityId) => {
    return new Promise((resolve) => {
      mockCharities = mockCharities.filter((c) => c.id !== charityId);
      setTimeout(resolve, 500);
    });
  };
  
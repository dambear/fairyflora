

export type Branch = {
  id: number;
  barangay: string;
  municipality: string;
  province: string;
  openingTime: string;
  closingTime: string;
  emailAddress: string;
  dateEstablished: string;
};



export async function fetchBranches(): Promise<Branch[]> {
  const response = await fetch(`https://relative-druci-danbearpersonalprojects-57a99032.koyeb.app/api/branches`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Branch[] = await response.json();
  
  // Sort the data based on the id in ascending order
  data.sort((a, b) => a.id - b.id);
  
  return data;
}

import { base_Url } from "./data";


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
  const response = await fetch(base_Url + '/branches');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Branch[] = await response.json();
  
  // Sort the data based on the id in ascending order
  data.sort((a, b) => a.id - b.id);
  
  return data;
}


export async function fetchBranchById(id: number): Promise<Branch> {
  const response = await fetch(base_Url + `/branches/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

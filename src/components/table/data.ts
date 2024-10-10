

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

export type Employee = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  salary: number;
  contactNumber: number;
  dateHired: string;
  role: string;
  emailAddress: string;
  branch: Branch;
};


export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch(`https://relative-druci-danbearpersonalprojects-57a99032.koyeb.app/api/employees`);
                                https://relative-druci-danbearpersonalprojects-57a99032.koyeb.app/
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Employee[] = await response.json();
  
  // Sort the data based on the id in ascending order
  data.sort((a, b) => a.id - b.id);
  
  return data;
}

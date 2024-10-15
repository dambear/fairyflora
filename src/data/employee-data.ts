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
  const response = await fetch(base_Url + '/employees');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Employee[] = await response.json();
  
  // Sort the data based on the id in ascending order
  data.sort((a, b) => a.id - b.id);
  
  return data;
}


export async function fetchEmployeeById(id: number): Promise<Employee> {
  const response = await fetch(base_Url + `/employees/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function createEmployee(employee: Employee): Promise<Employee> {
  console.log("Creating employee with data:", employee); // Debugging line
  const response = await fetch(base_Url + '/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response from server:', errorText); // Debugging line
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function updateEmployee(id: number, employee: Employee): Promise<Employee> {
  console.log("Updating employee with id:", id, "and data:", employee); // Debugging line
  const response = await fetch(base_Url + `/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response from server:', errorText); // Debugging line
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

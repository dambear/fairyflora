import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


export type Employee = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  salary: number;
  contactNumber: number;
  dateHired: Date;
  role: string;
  emailAddress: string;
  branch: {
    id: number;
    barangay: string;
    municipality: string;
    province: string;
    openingTime: string;
    closingTime: string;
    emailAddress: string;
    dateEstablished: Date;
    inventory: {
      id: number;
      ariel: number;
      downy: number;
      zonrox: number;
    };
  };
};

export default async function fetchEmployee(): Promise<Employee[]> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/employees`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}


export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
    cell: ({ row }) => <div>{row.getValue("middleName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "salary",
    header: () => <div className="text-right">Salary</div>,
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));

      // Format the salary as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => <div>{row.getValue("contactNumber")}</div>,
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("emailAddress")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.id.toString())}
            >
              Copy Employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Employee Details</DropdownMenuItem>
            {/* Add other actions as needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];



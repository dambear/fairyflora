"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckIcon, CaretSortIcon, CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { fetchBranches, Branch } from "@/data/branch-data";
import { createEmployee } from "@/data/employee-data";
import { format } from "date-fns";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  middleName: z.string().min(1, { message: "Middle name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  salary: z.number().min(0, { message: "Salary must be a positive number." }),
  contactNumber: z.string().min(10, { message: "Contact number is required." }),
  dateHired: z.string().min(1, { message: "Date hired is required." }),
  role: z.string().min(1, { message: "Role is required." }),
  emailAddress: z.string().email({ message: "Invalid email address." }),
  branchId: z.number().min(1, { message: "Branch is required." }),
});

export function AddEmployeeForm() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    async function loadBranches() {
      try {
        const data = await fetchBranches();
        setBranches(data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    }
    loadBranches();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      salary: 0,
      contactNumber: "",
      dateHired: "",
      role: "",
      emailAddress: "",
      branchId: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const transformedData = {
        ...data,
        branch: { id: data.branchId },
      };
      delete transformedData.branchId;
      const newEmployee = await createEmployee(transformedData);
      console.log("Employee added successfully:", newEmployee);
      // Handle successful submission
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const filteredBranches = branches.filter((branch) =>
    `${branch.barangay} ${branch.municipality} ${branch.province}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Middle Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Salary"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Contact Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateHired"
          render={({ field }) => (
            <FormItem className="mt-1.5 flex flex-col space-y-3">
              <FormLabel>Date Hired</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between overflow-hidden text-ellipsis whitespace-nowrap text-left font-normal text-muted-foreground"
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        field.onChange(selectedDate?.toISOString());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branchId"
          render={({ field }) => (
            <FormItem className="mt-1.5 flex flex-col space-y-3">
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between overflow-hidden text-ellipsis whitespace-nowrap text-left font-normal text-muted-foreground"
                    >
                      {value ? value : "Select branch..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search branch..."
                        value={searchTerm}
                        onValueChange={(search: string) =>
                          setSearchTerm(search)
                        }
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No branch found.</CommandEmpty>
                        <CommandGroup>
                          {filteredBranches.map((branch) => (
                            <CommandItem
                              key={branch.id}
                              value={`${branch.barangay} ${branch.municipality} ${branch.province}`}
                              onSelect={() => {
                                field.onChange(branch.id);
                                setValue(
                                  `${branch.barangay}, ${branch.municipality}, ${branch.province}`,
                                );
                                setOpen(false);
                              }}
                            >
                              {`${branch.barangay}, ${branch.municipality}, ${branch.province}`}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  value ===
                                    `${branch.barangay}, ${branch.municipality}, ${branch.province}`
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-4 mt-4">
          <Button type="submit">Add Employee</Button>
        </div>
      </form>
    </Form>
  );
}

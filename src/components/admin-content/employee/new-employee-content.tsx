"use client";

import { Card, CardContent } from "@/components/ui/card";

import { AddEmployeeForm } from "@/components/forms/employee/EmployeeForm";

export default function NewEmployeeContent() {
  return (
    <Card className="mt-6 rounded-lg border-none">
      <CardContent className="p-6">
        <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] items-center justify-center">
          {/* Dito LAgay */}
          <div className="relative flex flex-col">
            <AddEmployeeForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

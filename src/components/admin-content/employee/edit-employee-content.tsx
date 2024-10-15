"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EditEmployeeForm } from "@/components/forms/employee/EditEmployeeForm";

interface EditEmployeeContentProps {
  employeeId: number;
}

export default function EditEmployeeContent({ employeeId }: EditEmployeeContentProps) {
  return (
    <Card className="mt-6 rounded-lg border-none">
      <CardContent className="p-6">
        <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] items-center justify-center">
          <div className="relative flex flex-col">
            <EditEmployeeForm employeeId={employeeId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { acceptJob } from "@/app/(client)/api/actions"; // Import the action

export default async function ClientDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs, error } = await supabase
    .from("proposals")
    .select("*, job_id(*), emp_id(*)")
    .eq("job_id.client_id", user?.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard: Proposals</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">
                {proposal.emp_id.full_name}
              </TableCell>
              <TableCell>{proposal.emp_id.email}</TableCell>
              <TableCell>{proposal.job_id.title}</TableCell>
              <TableCell>
                <Link
                  href={proposal.emp_id.resume as string}
                  className="text-blue-500 hover:underline"
                >
                  View Resume
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <div className="space-x-2">
                  {/* Accept Button Form */}
                  <form action={acceptJob}>
                    <input type="hidden" name="jobId" value={proposal.job_id.id} />
                    <Button
                      type="submit"
                      size="sm"
                      variant="outline"
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      <Check className="h-4 w-4 mr-1" /> Accept
                    </Button>
                  </form>
                  {/* Reject Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

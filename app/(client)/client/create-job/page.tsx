import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { createJob } from "../../api/actions";

export default async function CreateJobPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create a New Job Listing</CardTitle>
          <CardDescription>
            Fill out the form below to post a new job opportunity.
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                name="title"
                id="title"
              />
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea name="description" id="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input name="location" id="location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input name="salary" id="salary" />
            </div>
            <Input
              type="hidden"
              id="client_id"
              name="client_id"
              value={user?.id}
            />
          </CardContent>
          <CardFooter>
            <Button formAction={createJob} type="submit" className="w-full">Post Job</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

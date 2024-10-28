"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createJob(formData: FormData) {
  const supabase = createClient();

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    salary: formData.get("salary") as string,
    client_id: formData.get("client_id") as string,
  };

  const { error } = await supabase.from("list_jobs").insert([
    {
      title: data.title,
      description: data.description,
      location: data.location,
      salary: data.salary,
      client_id: data.client_id,
    },
  ]);

  if (error) {
    console.log(error);
    revalidatePath("/error", "layout");
    redirect("/error");
  }

  revalidatePath("/client/posted", "layout");
  redirect("/client/posted");
}

export async function acceptJob(formData: FormData) {
    const supabase = createClient();
  
    // Get the jobId from the formData
    const jobId = formData.get("jobId") as string;
  
    // Perform the update query with the WHERE clause
    const { error } = await supabase
      .from("list_jobs")
      .update({ is_active: true })  // Update the job to be active
      .eq("id", jobId);             // Use the jobId to target the correct job


    const { error:proposal_error } = await supabase.from('proposals').delete().eq('job_id', jobId);

    if (proposal_error) {
        console.log(proposal_error);
        revalidatePath("/error", "layout");
        redirect("/error");
      }
  
    // Handle errors
    if (error) {
      console.log(error);
      revalidatePath("/error", "layout");
      redirect("/error");
    }
  
    // Revalidate and redirect
    revalidatePath("/client/posted", "layout");
    redirect("/client/posted");
  }

  export async function doneJob(formData: FormData) {
    const supabase = createClient();
  
    // Get the jobId from the formData
    const jobId = formData.get("jobId") as string;
  
    // Perform the update query with the WHERE clause
    const { error } = await supabase
      .from("list_jobs")
      .update({ is_done: true })  // Update the job to be active
      .eq("id", jobId);             // Use the jobId to target the correct job
  
      console.log(jobId)
    // Handle errors
    if (error) {
      console.log(error);
      revalidatePath("/error", "layout");
      redirect("/error");
    }
  
    // Revalidate and redirect
    revalidatePath("/client/posted", "layout");
    redirect("/client/posted");
  }
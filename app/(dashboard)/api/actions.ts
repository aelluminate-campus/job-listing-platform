"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function Login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function Signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (data.password.length !== data.confirmPassword.length) {
    return { error: "Password lengths do not match. Please try again." };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match. Please try again." };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function Logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getJobs() {
  const supabase = createClient();

  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    console.log(error);
    revalidatePath("/error", "layout");
    redirect("/error");
  }

  return data;
}

export async function uploadResume(formData: FormData) {
  const supabase = createClient();

  // Get the resume file and user id from formData
  const resumeFile = formData.get("resume") as File;
  const userId = formData.get("userId") as string; // Get the user ID

  if (!resumeFile) {
    throw new Error("No file selected");
  }

  // Upload the file to Supabase storage (bucket: 'resumes')
  const { data, error } = await supabase.storage
    .from("resumes")
    .upload(`${userId}/${resumeFile.name}`, resumeFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }

  // Get the public URL of the uploaded resume
  const { data: publicUrlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(`${userId}/${resumeFile.name}`);
  const publicUrl = publicUrlData?.publicUrl;

  // Update the 'resume' column in the 'emp_users' table
  const { error: updateError } = await supabase
    .from("emp_users")
    .update({ resume: publicUrl })
    .eq("id", userId);

  if (updateError) {
    throw new Error(`Failed to update user resume: ${updateError.message}`);
  }

  revalidatePath("/settings");
  return;
}

export async function applyJob(formData: FormData) {
  const supabase = createClient();

  const data = {
    jobId: formData.get("jobId") as string,
    userId: formData.get("userId") as string,
  };

  const { error } = await supabase.from("proposals").insert([
    {
      job_id: data.jobId,
      emp_id: data.userId,
    },
  ]);

  if (error) {
    console.log(error);
    revalidatePath("/error", "layout");
    redirect("/error");
  }

  revalidatePath("/home");
  return;
}
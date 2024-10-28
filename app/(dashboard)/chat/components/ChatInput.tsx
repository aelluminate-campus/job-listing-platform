"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";

export default function ChatInput({ params }: { params: any }) {
  const supabase = createClient();
  const [role, setRole] = React.useState<any>(null);
  const [user, setUser] = React.useState<any>(null);
  const [usery, setUsery] = React.useState<any>(null);
  const [userx, setUserX] = React.useState<any>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: usery } = await supabase.auth.getUser();
      setUsery(usery?.user?.id)
      const { data, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("user_id", usery?.user?.id)
        .single();

      setRole(data?.role);

      const { data: job, error: jobError } = await supabase
        .from("list_jobs")
        .select("*")
        .eq("id", params.id)
        .single();

      if (jobError) {
        console.error("Error fetching job info: ", jobError.message);
        return;
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", job.emp_id)
        .single();

      if (userError) {
        console.error("Error fetching user info: ", userError.message);
        return;
      }
      setUser(user);

      const { data: userx, error: userxError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", job.client_id)
        .single();

      if (userError) {
        console.error("Error fetching user info: ", userxError?.message);
        return;
      }

      setUserX(userx);
    };

    fetchRole();
  }, []);

  const handleSendMessageFreelance = async (text: string) => {
    const { error } = await supabase
      .from("messages")
      .insert({ message: text, job_id: params.id, receiver_id: userx.user_id, sender_id: usery });
    if (error) {
      console.error("Error sending message: ", error.message);
    }
  };

  const handleSendMessageClient = async (text: string) => {
    const { error } = await supabase
      .from("messages")
      .insert({ message: text, job_id: params.id, receiver_id: user.user_id, sender_id: usery });
    if (error) {
      console.error("Error sending message: ", error.message);
    }
  };

  return (
    <div>
      {role === "employee" ? (
        <div className="border-t px-4 py-2 flex items-center gap-2 fixed bottom-0 left-0 right-0 bg-white z-10">
          <Input
            placeholder="Type your message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessageFreelance(e.currentTarget.value);
                e.currentTarget.value = ""; // Clear the input after sending
              }
            }}
            className="flex-1 resize-none"
          />
          <Button
            type="submit"
            onClick={(e) => {
              const input = e.currentTarget
                .previousElementSibling as HTMLInputElement;
              handleSendMessageFreelance(input.value);
              input.value = ""; // Clear the input after sending
            }}
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      ) : (
        <div className="border-t px-4 py-2 flex items-center gap-2 fixed bottom-0 left-0 right-0 bg-white z-10">
          <Input
            placeholder="Type your message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessageClient(e.currentTarget.value);
                e.currentTarget.value = ""; // Clear the input after sending
              }
            }}
            className="flex-1 resize-none"
          />
          <Button
            type="submit"
            onClick={(e) => {
              const input = e.currentTarget
                .previousElementSibling as HTMLInputElement;
              handleSendMessageClient(input.value);
              input.value = ""; // Clear the input after sending
            }}
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      )}
    </div>
  );
}

function SendIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

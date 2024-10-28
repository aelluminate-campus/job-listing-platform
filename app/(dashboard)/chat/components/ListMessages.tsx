"use client";
import { Imessage, useMessageStore } from "@/lib/store/messages";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ListMessages({
  params,
  user_id,
}: {
  params: any;
  user_id: any;
}) {
  console.log(params);
  const { messages, addMessage } = useMessageStore((state) => state);
  const [user, setUser] = React.useState<any>(null);
  const [userx, setUserX] = React.useState<any>(null);
  const [role, setRole] = React.useState<any>(null);
  const [job, setJob] = React.useState<any>(null);
  const supabase = createClient();
  const jobId = parseInt(params.id, 10);

  useEffect(() => {
    const fetchDataAndSubscribe = async () => {
      try {
        const { data: usery } = await supabase.auth.getUser();
        const { data, error: roleError } = await supabase
          .from("users")
          .select("role")
          .eq("user_id", usery?.user?.id)
          .single();

        setRole(data?.role);

        // Convert params.id to an integer
        const jobId = parseInt(params.id, 10);

        // Fetch job info using integer jobId
        const { data: job, error: jobError } = await supabase
          .from("list_jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (jobError) {
          console.error("Error fetching job info: ", jobError.message);
          return;
        }

        setJob(job);

        // Fetch user info
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", job.client_id)
          .single();

        if (userError) {
          console.error("Error fetching user info: ", userError.message);
          return;
        }

        setUser(user);

        const { data: userx, error: userxError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", job.emp_id)
          .single();

        if (userError) {
          console.error("Error fetching user info: ", userxError?.message);
          return;
        }

        setUserX(userx);

        // Setup real-time subscription
        const channel = supabase
          .channel(`messages:,${jobId}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "messages",
            },

            async (payload) => {
              if (payload.new.job_id === jobId) {
                console.log("mama");
              }
              if (
                payload.new.job_id === jobId
                // payload.new.receiver_id === user_id ||
                // payload.new.receiver_id === user.user_id ||
                // payload.new.sender_id === user_id ||
                // payload.new.sender_id === user.user_id
              ) {
                console.log("New message: ", payload.new);
                const { data: sender, error: senderError } = await supabase
                  .from("users")
                  .select("*")
                  .eq("user_id", payload.new.sender_id)
                  .single();
                console.log("Sender: ", sender);
                if (senderError) {
                  console.error("Error fetching sender: ", senderError.message);
                }
                const { data: receiver, error: receiverError } = await supabase
                  .from("users")
                  .select("*")
                  .eq("user_id", payload.new.receiver_id)
                  .single();
                console.log("Receiver: ", receiver);
                if (receiverError) {
                  console.error(
                    "Error fetching receiver: ",
                    receiverError.message
                  );
                } else {
                  const newMessage = {
                    ...payload.new,
                    sender_id: sender,
                    receiver_id: receiver,
                  };
                  addMessage(newMessage as Imessage);
                }
              }
            }
          )
          .subscribe();

        return () => {
          channel.unsubscribe();
        };
      } catch (error) {
        console.error("Unexpected error: ", error);
      }
    };

    fetchDataAndSubscribe();
  }, []);

  // console.log(role);
  return (
    <div className="flex flex-col h-screen w-screen pb-16">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="font-medium">
          Chat with{" "}
          {role === "freelance" ? (
            <div>{user?.full_name}</div>
          ) : (
            <div>{userx?.full_name}</div>
          )}
        </div>
        <div />
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender_id.user_id === user_id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.sender_id.user_id !== user_id && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage
                  src="/placeholder.svg"
                  alt={message.sender_id?.full_name || "Sender"}
                />
                <AvatarFallback>
                  {message.sender_id?.full_name?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`flex flex-col ${
                message.sender_id.user_id === user_id
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-full ${
                  message.sender_id.user_id === user_id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-black"
                }`}
                style={{ whiteSpace: "pre-wrap" }}
              >
                <p className="break-words text-left">{message.message}</p>
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.sender_id.user_id === user_id
                    ? "text-gray-300 self-end"
                    : "text-gray-500 dark:text-gray-400 self-start"
                }`}
              >
                {new Date(message.created_at).toLocaleTimeString()}
              </div>
            </div>
            {message.sender_id.user_id === user_id && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src="/placeholder.svg" alt="You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowLeftIcon(
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
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

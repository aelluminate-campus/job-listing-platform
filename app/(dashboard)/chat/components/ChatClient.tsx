"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Search from "./Search"; // Adjust the path as needed

interface User {
  id: string;
  full_name: string;
}

interface JobListing {
  id: string;
  client_id?: User;
  emp_id?: User;
  title: string;
}

interface Message {
  id: string;
  message: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  job_id: string;
}

interface ChatClientProps {
  initialChatListFreelance: JobListing[];
  initialChatListClient: JobListing[];
  initialRecentMessages: Message[];
  userId: string;
}

export default function ChatClient({
  initialChatListFreelance,
  initialChatListClient,
  initialRecentMessages,
  userId,
}: ChatClientProps) {
  const filterValidUsers = (list: JobListing[]) =>
    list.filter((item) => item.client_id && item.emp_id);

  const [filteredChatListFreelance, setFilteredChatListFreelance] = useState(
    filterValidUsers(initialChatListFreelance)
  );
  const [filteredChatListClient, setFilteredChatListClient] = useState(
    filterValidUsers(initialChatListClient)
  );
  const [recentMessages, setRecentMessages] = useState(
    initialRecentMessages || []
  );

  const handleSearch = (filteredData: JobListing[]) => {
    setFilteredChatListFreelance(
      filterValidUsers(filteredData.filter((item) => item.emp_id))
    );
    setFilteredChatListClient(
      filterValidUsers(filteredData.filter((item) => item.client_id))
    );
  };

  const getRecentMessage = (jobId: string) => {
    const messagesForJob = recentMessages.filter((msg) => msg.job_id === jobId);
    if (messagesForJob.length > 0) {
      const recentMessage = messagesForJob.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];
      const messageText =
        recentMessage.sender_id === userId
          ? `You: ${recentMessage.message}`
          : recentMessage.message;
      return { message: messageText, created_at: recentMessage.created_at };
    }
    return { message: "No messages yet", created_at: "" };
  };

  const renderUserAvatar = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return null;
    const initials = `${firstName ? firstName[0] : ""}${
      lastName ? lastName[0] : ""
    }`;
    return <AvatarFallback>{initials}</AvatarFallback>;
  };

  // useEffect(() => {
  //   console.log("Filtered Chat List Freelance:", filteredChatListFreelance);
  //   console.log("Filtered Chat List Client:", filteredChatListClient);
  //   console.log("Recent Messages:", recentMessages);
  // }, [filteredChatListFreelance, filteredChatListClient, recentMessages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Search
        data={[...filteredChatListFreelance, ...filteredChatListClient]}
        onSearch={handleSearch}
      />
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-md mx-auto space-y-6">
          {filteredChatListFreelance.length === 0 &&
            filteredChatListClient.length === 0 && (
              <div className="text-center text-gray-500">No matches found.</div>
            )}
          {filteredChatListFreelance.map((item) => {
            if (!item.client_id || !item.client_id.full_name) return null;
            const recentMessage = getRecentMessage(item.id);

            return (
              <div key={item.id} className="space-y-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="px-4 pt-4 text-xs text-gray-500 dark:text-gray-400">
                    {recentMessage.created_at
                      ? new Date(recentMessage.created_at).toLocaleString()
                      : ""}
                  </div>
                  <Link
                    href={`/chat/${item.id}`}
                    className="flex items-center gap-4 p-4"
                    prefetch={false}
                  >
                    <Avatar>
                      {renderUserAvatar(item.client_id.full_name)}
                    </Avatar>
                    <div className="flex-1 grid gap-1">
                      <div className="font-medium">
                        {item.client_id.full_name}· {item.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {recentMessage.message}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}

          {filteredChatListClient.map((item) => {
            if (!item.emp_id || !item.emp_id.full_name) return null;
            const recentMessage = getRecentMessage(item.id);

            return (
              <div key={item.id} className="space-y-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="px-4 pt-4 text-xs text-gray-500 dark:text-gray-400">
                    {recentMessage.created_at
                      ? new Date(recentMessage.created_at).toLocaleString()
                      : ""}
                  </div>
                  <Link
                    href={`/chat/${item.id}`}
                    className="flex items-center gap-4 p-4"
                    prefetch={false}
                  >
                    <Avatar>{renderUserAvatar(item.emp_id.full_name)}</Avatar>
                    <div className="flex-1 grid gap-1">
                      <div className="font-medium">
                        {item.emp_id.full_name} · {item.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {recentMessage.message}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

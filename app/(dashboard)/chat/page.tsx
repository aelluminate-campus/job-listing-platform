import React from "react";
import { fetchData } from "./components/serverChatListdata";  // Adjust the path as needed
import ChatClient from "./components/ChatClient";  // Adjust the path as needed

export default async function Chat() {
  const { chatListFreelance, chatListClient, recentMessages, userId } = await fetchData();
  const safeUserId = userId || ""; // Provide a default value for userId if it is undefined

  const safeChatListFreelance = chatListFreelance || []; // Provide a default value of an empty array if chatListFreelance is null
  const safeChatListClient = chatListClient || []; // Provide a default value of an empty array if chatListClient is null
console.log(safeChatListFreelance)
  return (
    <ChatClient
      initialChatListFreelance={safeChatListFreelance}
      initialChatListClient={safeChatListClient}
      initialRecentMessages={recentMessages}
      userId={safeUserId}
    />
  );
}

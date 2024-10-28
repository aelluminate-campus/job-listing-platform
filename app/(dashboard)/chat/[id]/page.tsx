import React from "react";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";

export default function PrivateMessage({ params }: { params: any }) {
    // console.log(params)
  return (
    <div className="text-center flex flex-col  justify-center mx-auto">
      <ChatMessages params={params} />
      <ChatInput params={params}/>
    </div>
  );
}

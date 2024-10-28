"use client";

import React, { useEffect, useRef } from "react";
import { Imessage, useMessageStore } from "./messages";

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessageStore.setState({ messages });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);

  return <></>;
}

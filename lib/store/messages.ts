import { create } from "zustand";

export type Imessage = {
  id: string;
  message: string;
  sender_id: {
    user_id: string;
    full_name: string;
  };
  receiver_id: {
    user_id: string;
    full_name: string;
  };
  created_at: string;
};

type MessageStore = {
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));

// types.ts
export interface User {
    id: string;
    name: string;
    role: 'employee' | 'employer';
    email: string;
  }
  
  export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    created_at: string;
  }
  
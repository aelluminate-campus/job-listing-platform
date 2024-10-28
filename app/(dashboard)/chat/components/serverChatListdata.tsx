import { createClient } from "@/utils/supabase/server";

export async function fetchData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: chatListFreelance } = await supabase
    .from("list_jobs")
    .select(
      `
    *,
    client_id (*)
  `
    )
    .eq("emp_id", user?.id);

  const { data: chatListClient } = await supabase
    .from("list_jobs")
    .select(
      `
    *,
    emp_id (*)
  `
    )
    .eq("client_id", user?.id);

  const { data: recentMessages } = await supabase
    .from("messages")
    .select("id, message, created_at, sender_id, receiver_id, job_id")
    .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
    .order("created_at", { ascending: false });

  const enhancedRecentMessages = recentMessages
    ? recentMessages.map((msg) => {
        // Correct the receiver_id if it's a client message
        if (msg.sender_id === user?.id) {
          const job = chatListClient?.find((job) => job.id === msg.job_id); // Add null check for chatListClient
          if (job && job.freelance_id) {
            return {
              ...msg,
              receiver_id:
                typeof job.freelance_id === "object"
                  ? job.freelance_id.user_id
                  : job.freelance_id,
            };
          }
        }
        return {
          ...msg,
          sender_id:
            typeof msg.sender_id === "object"
              ? msg.sender_id.id
              : msg.sender_id,
          receiver_id:
            typeof msg.receiver_id === "object"
              ? msg.receiver_id.id
              : msg.receiver_id,
        };
      })
    : [];

  // console.log({
  //   chatListFreelance,
  //   chatListClient,
  //   recentMessages: enhancedRecentMessages || [],
  //   userId: user?.id,
  // });

  return {
    chatListFreelance,
    chatListClient,
    recentMessages: enhancedRecentMessages || [],
    userId: user?.id,
  };
}

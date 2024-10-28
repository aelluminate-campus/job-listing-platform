import React from "react";
import ListMessages from "./ListMessages";
import InitMessages from "@/lib/store/InitMessages";
import { createClient } from "@/utils/supabase/server";

export default async function ChatMessages({ params }: { params: any }) {
  // console.log(params);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("messages")
    .select("*, sender_id(*), receiver_id(*)")
    .eq("job_id", params.id);
  // .filter("sender_id", "in", `(${user?.id},${params.id})`)
  // .filter("receiver_id", "in", `(${user?.id},${params.id})`);
  // .or(`sender_id.eq.${user?.id},receiver_id.eq.${params.id}`);
  // console.log(data);

  return (
    <div>
      <ListMessages user_id={`${user?.id}`} params={params} />
      <InitMessages messages={data || []} />
    </div>
  );
}

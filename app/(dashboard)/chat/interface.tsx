interface ClientId {
  id: string;
  city: string | null;
  state: string | null;
  address: string | null;
  country: string | null;
  user_id: string;
  timezone: string | null;
  last_name: string | null;
  first_name: string;
}

interface Item {
  client_id: ClientId;
}

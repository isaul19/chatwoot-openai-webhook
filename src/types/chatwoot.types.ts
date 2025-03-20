export interface ChatwootRequest {
  account: Account;
  additional_attributes: Attributes;
  content_attributes: Attributes;
  content_type: string;
  content: string;
  conversation: Conversation;
  created_at: Date;
  id: number;
  inbox: Account;
  message_type: string;
  private: boolean;
  sender: Sender;
  source_id: string;
  event: string;
}

export interface Account {
  id: number;
  name: string;
}

export interface Attributes {}

export interface Conversation {
  additional_attributes: Attributes;
  can_reply: boolean;
  channel: string;
  contact_inbox: ContactInbox;
  id: number;
  inbox_id: number;
  messages: Message[];
  labels: any[];
  meta: Meta;
  status: string;
  custom_attributes: Attributes;
  snoozed_until: null;
  unread_count: number;
  first_reply_created_at: null;
  priority: null;
  waiting_since: number;
  agent_last_seen_at: number;
  contact_last_seen_at: number;
  last_activity_at: number;
  timestamp: number;
  created_at: number;
  updated_at: number;
}

export interface Message {
  id: number;
  content: string;
  account_id: number;
  inbox_id: number;
  conversation_id: number;
  message_type: number;
  created_at: number;
  updated_at: string;
  private: boolean;
  status: string;
  source_id: string;
  content_type: string;
  content_attributes: Attributes;
  sender_type: string;
  sender_id: number;
  external_source_ids: Attributes;
  additional_attributes: Attributes;
  processed_message_content: string;
  sentiment: Attributes;
  conversation: {
    assignee_id: number;
    unread_count: number;
    last_activity_at: number;
    contact_inbox: { source_id: string };
  };
  sender: {
    id: number;
    name: string;
    available_name: string;
    avatar_url: string;
    type: string;
    availability_status: null | string;
    thumbnail: string;
  };
}

export interface ContactInbox {
  id: number;
  contact_id: number;
  inbox_id: number;
  source_id: string;
  created_at: Date;
  updated_at: Date;
  hmac_verified: boolean;
  pubsub_token: string;
}

export interface Meta {
  sender: Sender;
  assignee: Assignee;
  team: null;
  hmac_verified: boolean;
}

export interface Assignee {
  id: number;
  name: string;
  available_name: string;
  avatar_url: string;
  type: string;
  availability_status: null | string;
  thumbnail: string;
}

export interface Sender {
  account: Account;
  additional_attributes: Attributes;
  avatar: string;
  custom_attributes: Attributes;
  email: null;
  id: number;
  identifier: null;
  name: string;
  phone_number: string;
  thumbnail: string;
  blocked: boolean;
}

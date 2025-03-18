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
  messages: Array<null[]>;
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
  sender: null[];
  assignee: null[];
  team: null;
  hmac_verified: boolean;
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

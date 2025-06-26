interface User {
  id: string;
  name: string;
  avatarUrl: string;
  bio?: string;
  reputation: number;
  expertiseTags?: string[];
}

enum IdeaVisibility {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
  GROUP_SPECIFIC = 'Group-specific',
}

interface IdeaEditHistoryEntry {
  title: string;
  content: string;
  tags: string[];
  visibility: IdeaVisibility;
  attachments?: FileAttachment[];
  editedAt: string;
}

interface Idea {
  id: string;
  userId: string;
  user?: User;
  title: string;
  content: string;
  tags: string[];
  visibility: IdeaVisibility;
  createdAt: string;
  upvotes: number;
  upvotedBy?: string[];
  commentsCount: number;
  mockupUrl?: string;
  attachments?: FileAttachment[];
  groupId?: string | null;
  editHistory?: IdeaEditHistoryEntry[];
}

interface IdeaComment {
  id: string;
  ideaId: string;
  userId: string;
  user?: User;
  parentId?: string | null;
  content: string;
  upvotes: number;
  downvotes: number; // Keeping for symmetry, though not fully implemented in UI
  createdAt: string;
  replies?: IdeaComment[];
}

interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
  createdBy: string;
  creator?: User; 
  bannerUrl?: string;
  members: string[]; // Array of user IDs
  membersCount: number; // Derived from members.length
  pinnedIdeaId?: string | null; // Added for pinned announcements
}

interface ChatMessage {
  id: string;
  senderId: string;
  sender?: User; 
  groupId?: string | null; // For group chats
  recipientId?: string | null; // For DMs
  content: string;
  timestamp: string;
  isMe?: boolean; 
}

interface FileAttachment {
  id: string;
  name: string;
  url: string; // Could be object URL for local files
  type: string; 
  size: number; 
}

interface AppNotification {
  id: string;
  message: string;
  read: boolean;
  timestamp: Date;
  link?: string;
  icon?: React.ReactElement<{ className?: string }>;
}

interface AiSuggestions {
  improvements: string[];
  audiences: string[];
  keywords: string[];
}

interface AiSummary {
  summary_points: string[];
}

interface AiTagSuggestions {
  suggested_tags: string[];
  suggested_category?: string;
}

interface AiFeedbackAnalysis {
  overall_sentiment: string;
  key_themes: { 
    theme: string; 
    example_comment_snippet?: string; 
  }[];
}

type Theme = 'light' | 'dark';

interface ChatbotMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Global IconProps definition
interface IconProps {
  className?: string;
  size?: number | string;
}

// Global TypeScript declaration for Vite env variables
// Use 'declare' to ensure these are global augmentations

declare interface ImportMetaEnv {
  readonly VITE_API_KEY?: string;
  // add other env variables here if needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
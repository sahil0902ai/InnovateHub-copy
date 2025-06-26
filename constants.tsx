import { User, Idea, Group, Comment, ChatMessage } from './types';

// --- INITIAL DATA (Used by contexts for initial state) ---
export const USERS_DATA: User[] = []; // Demo users removed

// These will be used by Data Contexts for initial state and modified in memory
export let INITIAL_IDEAS_DATA: Idea[] = [];
export let INITIAL_GROUPS_DATA: Group[] = [];
export let COMMENTS_DATA: { [ideaId: string]: Comment[] } = {}; // Comments still managed more directly for now
export let CHAT_MESSAGES_DATA: { [chatId: string]: ChatMessage[] } = {}; // Chat messages also direct

// --- Data Modification Functions (Called by Contexts) ---

// Ideas
export const _addIdeaToGlobalStore = (idea: Idea): Idea => {
  INITIAL_IDEAS_DATA.unshift(idea); // Add to the "global" in-memory store
  return idea;
};

export const _updateIdeaInGlobalStore = (updatedIdea: Idea): Idea | undefined => {
  const index = INITIAL_IDEAS_DATA.findIndex(i => i.id === updatedIdea.id);
  if (index !== -1) {
    INITIAL_IDEAS_DATA[index] = updatedIdea;
    return updatedIdea;
  }
  return undefined;
};

export const _getIdeaFromGlobalStore = (id: string): Idea | undefined => {
  const idea = INITIAL_IDEAS_DATA.find(idea => idea.id === id);
  if (idea) {
    // User object is now expected to be part of the idea object itself when fetched/created
    // or handled by the component if it's for the currentUser.
    return { ...idea };
  }
  return undefined;
};

// Groups
export const _addGroupToGlobalStore = (group: Group): Group => {
  INITIAL_GROUPS_DATA.unshift(group);
  return group;
};

export const _updateGroupInGlobalStore = (updatedGroup: Group): Group | undefined => {
  const index = INITIAL_GROUPS_DATA.findIndex(g => g.id === updatedGroup.id);
  if (index !== -1) {
    INITIAL_GROUPS_DATA[index] = updatedGroup;
    return updatedGroup;
  }
  return undefined;
};

export const _getGroupFromGlobalStore = (id: string): Group | undefined => {
  const group = INITIAL_GROUPS_DATA.find(g => g.id === id);
  if (group) {
    // Creator object is now expected to be part of the group object itself
    // or handled by the component if it's for the currentUser.
    return {
      ...group,
    };
  }
  return undefined;
};


// Comments (still direct modification for simplicity in IdeaDetailPage)
export const addCommentToStore = (comment: Comment): Comment => {
  if (!COMMENTS_DATA[comment.ideaId]) {
    COMMENTS_DATA[comment.ideaId] = [];
  }
  // If it's a reply, find the parent and add to its replies array
  if (comment.parentId) {
    const findAndAddReply = (commentsList: Comment[]): boolean => {
      for (let c of commentsList) {
        if (c.id === comment.parentId) {
          c.replies = [...(c.replies || []), comment];
          return true;
        }
        if (c.replies && findAndAddReply(c.replies)) {
          return true;
        }
      }
      return false;
    };
    findAndAddReply(COMMENTS_DATA[comment.ideaId]);
  } else {
    COMMENTS_DATA[comment.ideaId].unshift(comment);
  }
  return comment;
};

export const getCommentsByIdeaIdFromStore = (ideaId: string): Comment[] => {
  const populateUsers = (comments: Comment[]): Comment[] => {
    return comments.map(comment => ({
      ...comment,
      // User object should now be part of the comment itself when created
      replies: comment.replies ? populateUsers(comment.replies) : []
    }));
  };
  return populateUsers(COMMENTS_DATA[ideaId] || []).filter(comment => !comment.parentId);
};


// Chat Messages (direct modification)
export const addChatMessageToStore = (chatId: string, message: ChatMessage): ChatMessage => {
  if(!CHAT_MESSAGES_DATA[chatId]) {
    CHAT_MESSAGES_DATA[chatId] = [];
  }
  CHAT_MESSAGES_DATA[chatId].push(message);
  return message;
};

export const getChatMessagesFromStore = (chatId: string, currentUserId: string | undefined): ChatMessage[] => {
    return (CHAT_MESSAGES_DATA[chatId] || []).map(msg => ({
        ...msg,
        // Sender object should now be part of the message itself when created
        isMe: currentUserId ? msg.senderId === currentUserId : false,
    }));
};


export const GROUP_CATEGORIES = ["Technology", "AI", "Startups", "Sustainability", "Education", "Web3", "Marketing", "Hardware", "Non-profit", "Art & Design", "Science", "Gaming"];

// Utility to get user by ID - now largely a stub as user data comes from AuthContext for currentUser
// or needs a proper backend/profiles table for other users.
export const getUserById = (): User | undefined => {
  // console.warn(`getUserById called for ${userId}, but USERS_DATA is deprecated. Ensure user data is sourced from context or backend.`);
  return undefined; // No longer looking up in USERS_DATA
};

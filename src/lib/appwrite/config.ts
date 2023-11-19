import { Databases, Client, Account, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    databaseUserId: import.meta.env.VITE_APPWRITE_USER_DB_ID,
    databaseCommunitiesId: import.meta.env.VITE_APPWRITE_COMMUNITIES_DB_ID,
    databaseMessagesId: import.meta.env.VITE_APPWRITE_MESSAGES_DB_ID,
    databaseRolesId: import.meta.env.VITE_APPWRITE_ROLES_DB_ID,
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
}

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.endpoint);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
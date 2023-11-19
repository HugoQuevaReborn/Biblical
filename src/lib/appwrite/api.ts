import { 
    ICommunityCreateRequest,
    ILoginUser, 
    INewUser, 
    IUser,
    IUserOsData, 
} from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Models, Query } from "appwrite";

export const createCommunity = async (communityRequest: ICommunityCreateRequest) => {
    const community = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.databaseCommunitiesId,
        ID.unique(),
        {
            communityName: communityRequest.communityName,
            communityImage: communityRequest.communityImage,
            owner: communityRequest.ownerId,
        }
    ).catch(() => {
        throw Error("INTERNAL_ERROR")
    })

    if (!community) throw Error("NOT_FOUND");

    return community;
}

export const getCommunity = async (communityId: string) => {
    const community = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.databaseCommunitiesId,
        communityId,
    );

    if (!community) return Error("NOT_FOUND");

    return community;
}

export const getRole = async(roleId: string) => {
    const role = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.databaseRolesId,
        roleId
    ).catch(() => {
        throw Error("INTERNAL_ERROR");
    });

    if (!role) throw Error("NOT_FOUND");

    return role;
}

export const createUserAccount = async (user: INewUser) => {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    ).catch(() => {
        throw Error("INTERNAL_ERROR");
    });

    if (!newAccount) throw Error("NOT_FOUND");

    const avatarURL: URL = avatars.getInitials(newAccount.name);

    const userInfo: IUser = {
        userId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        imageURL: avatarURL,
        username: user.username || "",
        bio: "",
    }

    const userDocument = await createUserInDatabase(userInfo);

    if (!userDocument) throw Error("INTERNAL_ERROR");

    return newAccount;
}

export const getCurrentSession = async () => {
    const session: Models.Session = await account.getSession("current");

    if (!session) throw Error("INTERNAL_ERROR");

    return session;
}

export const getUserOs = async () => {
    const session: IUserOsData = await getCurrentSession();
    
    if (!session) throw Error("INTERAL_ERROR");

    return {
        ip: session.ip,
        name: session.name,
        country: session.country,
        deviceBrand: session.deviceBrand,
        deviceModel: session.deviceModel,
        deviceName: session.deviceName,
        osName: session.osName,
        osVersion: session.osVersion,
        provider: session.provider,
    };
}

export const getUser = async () => {
    const user = account.get();

    if (!user) throw Error("INTERNAL_ERROR");

    return user;
}

export const getCurrentUser = async() => {
    const user = await getUser()

    const userInfo = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.databaseUserId,
        [Query.equal("accountId", user.$id)]
    ).catch(() => {
        throw Error("INTERNAL_ERROR");
    })

    return userInfo.documents[0];
}

export const loginUserAccount = async (user: ILoginUser) => {
    const _user = account.createEmailSession(user.email,user.password)
    .catch(() => {
        return Error("Failed to connect user to account!");
    });

    return _user;
}

export const createUserInDatabase = async (user: IUser) => {
    const userDocument = databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.databaseUserId,
        ID.unique(),
        user
        )
    .catch(() => {
        throw Error("INTERNAL_ERROR")
    });

    return userDocument;
}

export const updateUserAccount = async () => {
    
}

export const logoutUser = async () => {
    const currentSession = await getCurrentSession();

    if (!currentSession) throw Error("INTERNAL_ERROR");

    account.deleteSession(currentSession.$id);
}
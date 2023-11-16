import { INewUser } from "@/types";
import { account, databases } from "./config";
import { ID } from "appwrite";

export const createUserAccount = async (user: INewUser) => {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name)
    .catch((err) => {
        console.error(`Failed to create user! ${err}`);
    });

    return newAccount;
}

export const updateUserAccount = async () => {
    
}
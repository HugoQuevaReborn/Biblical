import { IPermissionRequest } from "@/types";
import { Permissions } from "./permissions";
import { appwriteConfig, databases } from "../appwrite/config";


export const hasPermission = async (permission: IPermissionRequest): Promise<boolean> => {
    //THIS IS NOT A GOOD WAY TO DO IT.
    //WE SHOULD GET THE ROLES FROM THE USER AND CHECK IF THE USER CAN
    //DO WHAT HE WANTS TO.
    
    const role = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.databaseRolesId,
        permission.roleId);
    
    if (!role) throw Error("Failed to find role!");

    return  (role.rolePermission & permission.permission) === permission.permission
            || (role.rolePermission & Permissions.ALL) === Permissions.ALL;
}
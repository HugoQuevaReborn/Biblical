export interface INewUser {
    name: string,
    username: string,
    email: string,
    password: string,
}

export interface ILoginUser {
    email: string,
    password: string,
}

export interface IUser {
    userId: string,
    name: string,
    email: string,
    imageURL: URL,
    username?: string,
    bio?: string,
}

export interface IUserOsData {
    ip?: string,
    name?: string,
    country?: string,
    deviceBrand?: string,
    deviceModel?: string,
    deviceName?: string,
    osName?: string,
    osVersion?: string,
    provider?: string,
}

export interface IPermissionRequest {
    roleId: string,
    userId: string,
    permission: number,
}

export interface ICommunityCreateRequest {
    communityName: string,
    communityImage: URL,
    ownerId: string,
}
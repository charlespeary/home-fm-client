import { Action, User, UserAction } from "./index";
import { getUserInformations } from "../Functions";
import { Dispatch } from "react";

export function getUserData(user: User): UserAction {
    return {
        user,
        type: Action.SAVE_USER_PROFILE
    }
}



export async function fetchUserInformations(): Promise<UserAction> {
    return getUserInformations().then((user: any) => getUserData(user));
}
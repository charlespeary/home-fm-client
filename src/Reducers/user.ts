import { Action, User, UserAction } from "../Actions/index";
export function user(state: User = { name: "" }, action: UserAction): User {
    switch (action.type) {
        case Action.SAVE_USER_PROFILE:
            return action.user;
        default:
            return state;

    }
}

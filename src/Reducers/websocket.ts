import { StandardAction, Action } from "../Actions/index";
// websocket connection

export function websocketConnected(
  state: boolean = false,
  action: StandardAction<boolean>
): boolean {
  switch (action.type) {
    case Action.WS_CONNECTION_FAILED:
      return false;
    case Action.WS_CONNECTION_SUCCESSFULL:
      return true;
    default:
      return state;
  }
}

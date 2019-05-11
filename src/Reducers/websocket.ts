import { Action } from "../Actions/types";
import { SocketAction } from "../Actions/websocket";

// websocket connection

export function websocketConnected(
  state: boolean = false,
  action: SocketAction
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

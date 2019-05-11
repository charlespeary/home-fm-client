import { CurrentView, Action } from "../Actions/types";
import { CurrentViewAction } from "../Actions/currentView";

export function currentView(
  state: CurrentView = CurrentView.AvailableSongs,
  action: CurrentViewAction
): CurrentView {
  switch (action.type) {
    case Action.SET_VIEW:
      return action.view;
    default:
      return state;
  }
}

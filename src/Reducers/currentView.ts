import { StandardAction, CurrentView, Action } from "../Actions/index";
export function currentView(
  state: CurrentView = CurrentView.AvailableSongs,
  action: StandardAction<CurrentView>
): CurrentView {
  switch (action.type) {
    case Action.SET_VIEW:
      return action.value;
    default:
      return state;
  }
}

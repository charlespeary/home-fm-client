import { Action, CurrentView, StandardAction } from ".";

export function setView(view: CurrentView): StandardAction<CurrentView> {
  return {
    type: Action.SET_VIEW,
    value: view
  };
}

import { Action, CurrentView } from "./types";

export type SetView = {
  type: Action.SET_VIEW;
  view: CurrentView;
};

export type CurrentViewAction = SetView;

export function setView(view: CurrentView): CurrentViewAction {
  return {
    type: Action.SET_VIEW,
    view
  };
}

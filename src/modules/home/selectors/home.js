import { createSelector } from "reselect";
import { FEATURE_NAME } from "../constants";
import { navigationReducer } from "../reducers";

const { initialState } = navigationReducer;
const getState = state => state.get(FEATURE_NAME, initialState);

const selectAllPlayers = () =>
  createSelector(
    getState,
    state => state.get("players")
  );

const selectCurrentRound = () =>
  createSelector(
    getState,
    state => state.get("round")
  );

const selectDeckId = () =>
  createSelector(
    getState,
    state => state.get("deck_id")
  );

const selectDrawStatus = () =>
  createSelector(
    getState,
    state => state.get("isDrawing")
  );

const selectShuffled = () =>
  createSelector(
    getState,
    state => state.get("shuffled")
  );

const selectIsGameOver = () =>
  createSelector(
    getState,
    state => state.get("isGameOver")
  );

const selectShuffleLoading = () =>
  createSelector(
    getState,
    state => state.get("isShuffleLoading")
  );

export {
  selectAllPlayers,
  selectCurrentRound,
  selectDeckId,
  selectShuffled,
  selectDrawStatus,
  selectIsGameOver,
  selectShuffleLoading
};

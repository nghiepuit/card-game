export const FEATURE_NAME = "HOME";

export const PLAYER_POSITION = {
  TOP: "TOP",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
  LEFT: "LEFT"
};

export const LOAD_DECK = "LOAD_DECK";
export const LOAD_DECK_SUCCESS = "LOAD_DECK_SUCCESS";
export const LOAD_DECK_FAILED = "LOAD_DECK_FAILED";

export const START_GAME = "START_GAME";
export const START_GAME_FAILED = "START_GAME_FAILED";
export const START_GAME_SUCCESS = "START_GAME_SUCCESS";

export const DRAW_CARD = "DRAW_CARD";
export const DRAW_CARD_FAILED = "DRAW_CARD_FAILED";
export const DRAW_CARD_SUCCESS = "DRAW_CARD_SUCCESS";

export const POINT = {
  A: 1,
  J: 10,
  Q: 10,
  K: 10
};

export function getPoint(number) {
  const strNumber = number.toString();
  return strNumber.substring(strNumber.length - 1);
}

export const STATUS = {
  WAITING: "WAITING",
  PLAYING: "PLAYING",
  ENDING: "ENDING"
}
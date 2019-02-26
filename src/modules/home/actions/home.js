import * as types from "../constants";

export const loadDeck = (params = {}) => {
  return {
    type: types.LOAD_DECK,
    payload: {
      params
    }
  };
};

export const startGame = () => {
  return {
    type: types.START_GAME
  };
};

export const drawCard = () => {
  return {
    type: types.DRAW_CARD
  };
};

export const revealAllCard = () => {
  return {
    type: types.REVEAL
  };
};

import { fromJS } from "immutable";
import { toast } from "react-toastify";
import * as types from "../constants";
import { cloneDeep } from "lodash";
import { getPointOfCards } from "../../../helpers/CommonHelper";

export const initialState = fromJS({
  players: [
    {
      id: 1,
      name: "Billy",
      point: 20000,
      cards: []
    },
    {
      id: 2,
      name: "Lisa",
      point: 20000,
      cards: []
    },
    {
      id: 3,
      name: "Nghiep",
      point: 20000,
      isMine: true,
      cards: []
    },
    {
      id: 4,
      name: "Mike",
      point: 20000,
      cards: []
    }
  ],
  round: 0,
  deck_id: null,
  status: null,
  shuffled: false,
  isDrawing: false,
  isGameOver: false,
  isShuffleLoading: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DECK: {
      return state.set("deck_id", null);
    }
    case types.LOAD_DECK_SUCCESS: {
      const { deck_id } = action.payload;
      return state
        .set("deck_id", deck_id)
        .set("isDrawing", false)
        .set("isShuffleLoading", false);
    }
    case types.LOAD_DECK_FAILED: {
      const { error } = action.payload;
      if (error && error.message) {
        try {
          const errObj = JSON.parse(error.message);
          if (typeof errObj === "object") {
            Object.keys(errObj).forEach(key => {
              toast.error(errObj[key], {
                position: toast.POSITION.TOP_RIGHT
              });
            });
          } else {
            toast.error(error.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        } catch {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
      return state
        .set("error", error)
        .set("deck_id", null)
        .set("isShuffleLoading", false);
    }
    case types.START_GAME: {
      return state.set("shuffled", true).set("isShuffleLoading", true);
    }
    case types.DRAW_CARD: {
      let players = [];
      if (state.get("players") instanceof Array) {
        players = cloneDeep(state.get("players"));
      } else {
        players = cloneDeep(state.get("players").toJS());
      }
      return state.set("players", players).set("round", state.get("round") + 1);
    }
    case types.DRAW_CARD_SUCCESS: {
      const { cards } = action.payload;
      let players = [];
      if (state.get("players") instanceof Array) {
        players = cloneDeep(state.get("players"));
      } else {
        players = cloneDeep(state.get("players").toJS());
      }

      let j = 0;
      let cardPosition = 0;
      for (let i = 0; i < players.length; i++) {
        cardPosition = 0;
        const player = players[i];
        player.cards[cardPosition] = cards[j];
        player.cards[cardPosition + 1] = cards[j + 1];
        player.cards[cardPosition + 2] = cards[j + 2];
        player.cards[cardPosition].isFaceDown = player.isMine ? false : true;
        player.cards[cardPosition + 1].isFaceDown = player.isMine
          ? false
          : true;
        player.cards[cardPosition + 2].isFaceDown = player.isMine
          ? false
          : true;
        j += 2;

        // get point of mine
        if (player.isMine) {
          const value = getPointOfCards(player.cards);
          player.value = value;
        }
      }

      return state.set("players", players).set("isDrawing", true);
    }
    case types.DRAW_CARD_FAILED: {
      const { error } = action.payload;
      if (error && error.message) {
        try {
          const errObj = JSON.parse(error.message);
          if (typeof errObj === "object") {
            Object.keys(errObj).forEach(key => {
              toast.error(errObj[key], {
                position: toast.POSITION.TOP_RIGHT
              });
            });
          } else {
            toast.error(error.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        } catch {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
      return state.set("error", error).set("deck_id", null);
    }
    case types.REVEAL: {
      let players = [];
      if (state.get("players") instanceof Array) {
        players = cloneDeep(state.get("players"));
      } else {
        players = cloneDeep(state.get("players").toJS());
      }

      let j = 0;
      let winPoint = null;
      for (let i = 0; i < players.length; i++) {
        j = 0;
        const player = players[i];
        player.cards[j].isFaceDown = false;
        player.cards[j + 1].isFaceDown = false;
        player.cards[j + 2].isFaceDown = false;
      }

      // handle calculate point
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (player.point > 0) {
          const value = getPointOfCards(player.cards);
          player.value = value;
          if (winPoint === null) {
            winPoint = value;
          } else {
            if (value > winPoint) {
              winPoint = value;
            }
          }
        }
      }

      const listWinner = [];
      let totalWinnerPoint = 0;
      // move point if less than winPoint
      players
        .filter(player => player.point > 0)
        .forEach(player => {
          if (player.value < winPoint) {
            player.point -= types.BET_VALUE;
            totalWinnerPoint += types.BET_VALUE;
          } else if (player.value === winPoint) {
            listWinner.push(player.id);
          }
        });

      players
        .filter(player => player.point > 0)
        .forEach(player => {
          if (listWinner.indexOf(player.id) !== -1) {
            player.point += totalWinnerPoint / listWinner.length;
          }
        });

      let isGameOver = false;
      const lengthHasPoint = players.filter(player => player.point > 0);
      const round = state.get("round");
      if (round === 5 || lengthHasPoint < 2) {
        isGameOver = true;
      }

      return state
        .set("players", players)
        .set("shuffled", false)
        .set("isDrawing", false)
        .set("isGameOver", isGameOver);
    }
    default:
      return state;
  }
};

export default reducer;

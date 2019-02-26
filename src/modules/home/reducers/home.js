import { fromJS } from "immutable";
import { toast } from "react-toastify";
import * as types from "../constants";
import { cloneDeep } from "lodash";

export const initialState = fromJS({
  players: [
    {
      id: 1,
      name: "Billy",
      point: 5000,
      cards: []
    },
    {
      id: 2,
      name: "Lisa",
      point: 5000,
      cards: []
    },
    {
      id: 3,
      name: "Nghiep",
      point: 5000,
      isMine: true,
      cards: []
    },
    {
      id: 4,
      name: "Mike",
      point: 5000,
      cards: []
    }
  ],
  round: 0,
  deck_id: null,
  status: null,
  shuffled: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DECK: {
      return state.set("deck_id", null);
    }
    case types.LOAD_DECK_SUCCESS: {
      const { deck_id } = action.payload;
      return state.set("deck_id", deck_id);
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
      return state.set("error", error).set("deck_id", null);
    }
    case types.START_GAME: {
      return state.set("shuffled", true);
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
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        player.cards[j] = cards[j];
        player.cards[j].isFaceDown = true;
        player.cards[j+1] = cards[j+1];
        player.cards[j+1].isFaceDown = true;
        player.cards[j+2] = cards[j+2];
        player.cards[j+2].isFaceDown = true;
        j+=2;
      }

      return state.set("players", players);
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
    default:
      return state;
  }
};

export default reducer;

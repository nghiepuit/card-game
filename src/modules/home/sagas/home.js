import { ROOT_API_URL, STATUS_CODE } from "constants/index";
import queryString from "query-string";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import * as types from "../constants";
import { selectDeckId } from "../selectors";

export default function* root() {
  yield all([
    takeLatest(types.LOAD_DECK, loadDeck),
    takeLatest(types.START_GAME, startGame),
    takeLatest(types.DRAW_CARD, drawCard)
  ]);
}

function* loadDeck({ payload }) {
  const { params } = payload;
  const query = queryString.stringify(params);
  try {
    const resp = yield call(requestLoadDeck, query);
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: types.LOAD_DECK_SUCCESS,
        payload: {
          deck_id: data.deck_id
        }
      });
    } else {
      yield put({
        type: types.LOAD_DECK_FAILED,
        payload: {
          error: data
        }
      });
    }
  } catch (error) {
    yield put({
      type: types.LOAD_DECK_FAILED,
      payload: {
        error
      }
    });
  }
}

function* startGame() {
  try {
    const deck_id = yield select(selectDeckId());
    const resp = yield call(requestStartGame, deck_id);
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: types.LOAD_DECK_SUCCESS,
        payload: {
          deck_id: data.deck_id
        }
      });
    } else {
      yield put({
        type: types.LOAD_DECK_FAILED,
        payload: {
          error: data
        }
      });
    }
  } catch (error) {
    yield put({
      type: types.START_GAME_FAILED,
      payload: {
        error
      }
    });
  }
}

function* drawCard() {
  try {
    const deck_id = yield select(selectDeckId());
    const resp = yield call(requestDrawCard, deck_id);
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: types.DRAW_CARD_SUCCESS,
        payload: {
          cards: data.cards
        }
      });
    } else {
      yield put({
        type: types.DRAW_CARD_FAILED,
        payload: {
          error: data
        }
      });
    }
  } catch (error) {
    yield put({
      type: types.DRAW_CARD_FAILED,
      payload: {
        error
      }
    });
  }
}

/* Request */

function requestLoadDeck() {
  let response = null;
  return fetch(`${ROOT_API_URL}/deck/new/shuffle/?deck_count=1`, {
    method: "GET"
  })
    .then(async res => {
      const responseStatus = res.status;
      try {
        response = await res.json();
      } catch (e) {
        response = null;
      }
      const result = {
        data: response ? response : "",
        status: responseStatus === 204 ? 200 : responseStatus
      };
      return result;
    })
    .catch(err => {
      return {
        data: response,
        status: err.status
      };
    });
}

function requestStartGame(deck_id) {
  let response = null;
  return fetch(`${ROOT_API_URL}/deck/${deck_id}/shuffle/`, {
    method: "GET"
  })
    .then(async res => {
      const responseStatus = res.status;
      try {
        response = await res.json();
      } catch (e) {
        response = null;
      }
      const result = {
        data: response ? response : "",
        status: responseStatus === 204 ? 200 : responseStatus
      };
      return result;
    })
    .catch(err => {
      return {
        data: response,
        status: err.status
      };
    });
}

function requestDrawCard(deck_id) {
  let response = null;
  return fetch(`${ROOT_API_URL}/deck/${deck_id}/draw/?count=12`, {
    method: "GET"
  })
    .then(async res => {
      const responseStatus = res.status;
      try {
        response = await res.json();
      } catch (e) {
        response = null;
      }
      const result = {
        data: response ? response : "",
        status: responseStatus === 204 ? 200 : responseStatus
      };
      return result;
    })
    .catch(err => {
      return {
        data: response,
        status: err.status
      };
    });
}

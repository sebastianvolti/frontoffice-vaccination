// Types
import {
  UPDATE_AUTH_DATA,
  UPDATE_AGENDA_DATA,
} from "./types";
import { FLUSH } from "redux-persist";

const INITIAL_STATE = {
  auth: { data: null },
  agendas: [],
};

export const authReducer = (state = INITIAL_STATE.auth, action) => {
  switch (action.type) {
    case UPDATE_AUTH_DATA:
      return Object.assign({}, state, action.payload);
    case FLUSH:
      return INITIAL_STATE.auth;
    default:
      return state;
  }
};

export const agendaReducer = (state = INITIAL_STATE.agendas, action) => {
  switch (action.type) {
    case UPDATE_AGENDA_DATA:
      return Object.assign([], state, action.payload.data);
    case FLUSH:
      return INITIAL_STATE.agendas;
    default:
      return state;
  }
};




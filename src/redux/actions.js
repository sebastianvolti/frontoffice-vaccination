// Types
import {
  UPDATE_AUTH_DATA,
  UPDATE_AGENDA_DATA
} from "./types";

/**
 * ========================================
 *                 AUTH
 * ========================================
 */
export function updateAuthData(payload) {
  return {
    type: UPDATE_AUTH_DATA,
    payload
  };
}


/**
 * ========================================
 *                 AGENDAS
 * ========================================
 */
export function updateAgendaData(payload) {
  return {
    type: UPDATE_AGENDA_DATA,
    payload
  };
}

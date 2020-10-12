import { createStore } from 'redux'

const SET_NEW_USER_NAME = 'SET_NEW_USER_NAME'
const SET_NEW_USER_EMAIL = 'SET_NEW_USER_EMAIL'
const SET_NEW_USER_PASSWORD = 'SET_NEW_USER_PASSWORD'
const SAVE_NEW_USER = 'SAVE_NEW_USER'
const SET_OLD_USER_EMAIL = 'SET_OLD_USER_EMAIL'
const SET_OLD_USER_PASSWORD = 'SET_OLD_USER_PASSWORD'
const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
const SET_ROLE = 'SET_ROLE'
const SET_EVENT_NAME = 'SET_EVENT_NAME'
const SET_EVENT_START_DATE = 'SET_EVENT_START_DATE'
const SET_EVENT_END_DATE = 'SET_EVENT_END_DATE'
const SET_EVENT_DESCRIPTION = 'SET_EVENT_DESCRIPTION'
const SAVE_NEW_EVENT = 'SAVE_NEW_EVENT'
const SET_CURRENT_USER_EMAIL = 'SET_CURRENT_USER_EMAIL'

export function setUserName(userName) {
  return {
    type: SET_NEW_USER_NAME,
    payload: userName,
  }
}

export function setUserPassword(password) {
  return {
    type: SET_NEW_USER_PASSWORD,
    payload: password,
  }
}

export function setUserEmail(email) {
  return {
    type: SET_NEW_USER_EMAIL,
    payload: email,
  }
}

export function saveNewUser(user) {
  return {
    type: SAVE_NEW_USER,
    payload: user,
  }
}

export function setOldUserEmail(email) {
  return {
    type: SET_OLD_USER_EMAIL,
    payload: email,
  }
}

export function setOldUserPassword(password) {
  return {
    type: SET_OLD_USER_PASSWORD,
    payload: password,
  }
}

export function setAuthenticated(status) {
  return {
    type: SET_AUTHENTICATED,
    payload: status,
  }
}

export function setRole(role) {
  return {
    type: SET_ROLE,
    payload: role,
  }
}

export function setEventName(name) {
  return {
    type: SET_EVENT_NAME,
    payload: name,
  }
}

export function setEventStartDate(date) {
  return {
    type: SET_EVENT_START_DATE,
    payload: date,
  }
}
export function setEventEndDate(date) {
  return {
    type: SET_EVENT_END_DATE,
    payload: date,
  }
}
export function setEventDescription(date) {
  return {
    type: SET_EVENT_DESCRIPTION,
    payload: date,
  }
}

export function saveNewEvent(event) {
  return {
    type: SAVE_NEW_EVENT,
    payload: event,
  }
}

export function setCurrentUserEmail(email) {
  return {
    type: SET_CURRENT_USER_EMAIL,
    payload: email,
  }
}

const moment = require('moment')
const date = moment().format('LLL')

const initialState = {
  user: {
    name: '',
    password: '',
    email: '',
  },
  oldUser: {
    password: '',
    email: '',
  },
  currentUser: {
    email: '',
  },
  usersList: [],
  isAuthenticated: false,
  role: '',
  event: {
    name: '',
    startDate: date,
    endDate: '',
    description: '',
  },
  eventsList: [],
}

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('persistentState', serializedState)
  } catch (e) {
    console.warn(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('persistentState')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_USER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      }
    case SET_NEW_USER_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      }
    case SET_NEW_USER_PASSWORD:
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload,
        },
      }
    case SAVE_NEW_USER:
      return {
        ...state,
        usersList: [...state.usersList, action.payload],
      }
    case SET_OLD_USER_EMAIL:
      return {
        ...state,
        oldUser: {
          ...state.oldUser,
          email: action.payload,
        },
      }
    case SET_OLD_USER_PASSWORD:
      return {
        ...state,
        oldUser: {
          ...state.oldUser,
          password: action.payload,
        },
      }
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      }
    case SET_EVENT_NAME:
      return {
        ...state,
        event: {
          ...state.event,
          name: action.payload,
        },
      }
    case SET_EVENT_START_DATE:
      return {
        ...state,
        event: {
          ...state.event,
          startDate: action.payload,
        },
      }
    case SET_EVENT_END_DATE:
      return {
        ...state,
        event: {
          ...state.event,
          endDate: action.payload,
        },
      }
    case SET_EVENT_DESCRIPTION:
      return {
        ...state,
        event: {
          ...state.event,
          description: action.payload,
        },
      }
    case SET_CURRENT_USER_EMAIL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          email: action.payload,
        },
      }
    case SAVE_NEW_EVENT: {
      return {
        ...state,
        eventsList: [...state.eventsList, action.payload],
      }
    }
    default:
      return state
  }
}

const store = createStore(reducer, loadFromLocalStorage())
store.subscribe(() => saveToLocalStorage(store.getState()))
export default store

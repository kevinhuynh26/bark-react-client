import {
  SET_BARKS,
  SET_ONE_BARK,
  LOADING_DATA,
  LIKE_BARK,
  UNLIKE_BARK,
  DELETE_BARK,
  POST_BARK,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  barks: [],
  bark: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_BARKS:
      return { ...state, barks: action.payload, loading: false };
    case SET_ONE_BARK:
      return { ...state, bark: action.payload, loading: false };
    case LIKE_BARK:
    case UNLIKE_BARK:
      let index_1 = state.barks.findIndex(
        (bark) => bark.barkID === action.payload.barkID
      );
      state.barks[index_1] = action.payload;
      if (state.bark.barkID === action.payload.barkID) {
        action.payload.comments = state.bark.comments;
        action.payload.commentCount = state.bark.commentCount;
        state.bark = action.payload;
      }
      return { ...state };
    case SUBMIT_COMMENT:
      state.bark.commentCount++;
      let index_2 = state.barks.findIndex(
        (bark) => bark.barkID === action.payload.barkID
      );
      state.barks[index_2].commentCount++;
      return {
        ...state,
        bark: {
          ...state.bark,
          comments: [action.payload, ...state.bark.comments],
        },
      };
    case DELETE_BARK:
      let index_3 = state.barks.findIndex(
        (bark) => bark.barkID === action.payload
      );
      state.barks.splice(index_3, 1);
      return { ...state };
    case POST_BARK:
      return {
        ...state,
        barks: [action.payload.barkWithBarkId, ...state.barks],
      };
    default:
      return state;
  }
}

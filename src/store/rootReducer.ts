import { combineReducers } from "@reduxjs/toolkit";
import usuarios from "./sliceUsuario";
import mensagens from "./sliceMensagens";
const reducers = {
  usuarios,
  mensagens,
};

const combineReducer = combineReducers({
  ...reducers,
});

export type TrabalhoDeModulo = ReturnType<typeof combineReducer>;
export default combineReducer;

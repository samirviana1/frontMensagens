import {TrabalhoDeModulo} from "./rootReducer";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export interface Mensagem {
  id: string;
  descricao: string;
  detalhamento: string;
  idUsuario: string;
}

export interface MensagemEstado {
  loading: boolean;
  mensagem: {
    tipo: string;
    estado: number;
    texto: string;
  };
  listaMensagem: Array<Mensagem>;
  showModal: {
    open: boolean;
    type: string;
  };

  selectId: string | null;
}

const initialState: MensagemEstado = {
  loading: false,
  mensagem: {
    tipo: "",
    estado: 200,
    texto: "",
  },
  listaMensagem: [],
  showModal: {
    open: false,
    type: "",
  },
  selectId: null,
};

export const mensagensSelectAll = (state: TrabalhoDeModulo) => state.mensagens;

const mensagensSlice = createSlice({
  name: "mensagens",
  initialState,
  reducers: {
    setNovaMensagem: (state, action) => {
      state.listaMensagem = [...state.listaMensagem, action.payload];
    },
    removeMensagensbyID: (state, action) => {
      const id = action.payload;
      const filterMensagens = state.listaMensagem.filter((i) => i.id !== id);
      state.listaMensagem = filterMensagens;
    },
    updadeMensagembyID: (state, action) => {
      const {id, descricao, detalhamento} = action.payload;

      const index = state.listaMensagem.findIndex((i) => i.id === id);

      const editMsg: Mensagem = {
        id,
        descricao,
        detalhamento,
        idUsuario: state.listaMensagem[index].idUsuario,
      };
      state.listaMensagem.splice(index, 1, editMsg);
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setNovaMensagem,
  removeMensagensbyID,
  updadeMensagembyID,
  setSelectId,
  setShowModal,
} = mensagensSlice.actions;
export default mensagensSlice.reducer;

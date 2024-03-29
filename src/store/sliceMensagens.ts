import instace from "../service/api";
import {TrabalhoDeModulo} from "./rootReducer";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export interface Mensagem {
  id: string;
  title: string;
  description: string;
  uid: string;
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

export const getAllStickynotes = createAsyncThunk(
  "getAllStickynotes/get",
  async (_, {dispatch}) => {
    const response = await instace.doGet("/notes");
    if (response?.status !== 200) {
      dispatch(setNovaMensagem([]));
      return;
    }
    dispatch(setNovaMensagem(response.data.dados));
  }
);

export const getIdStickynotes = createAsyncThunk(
  "getIdStickynotes/get",
  async (uid, {dispatch}) => {
    const response = await instace.doGet(`/notes/${uid}`);
    if (response?.status !== 200) {
      return;
    }
    return response.data;
  }
);

export const postStickynotes = createAsyncThunk(
  "postStickynotes/post",
  async (body: any, {dispatch}) => {
    const response = await instace.doPost("/notes", body);
    if (response?.data.dados !== 200) {
      return response?.data;
    }
    dispatch(setNovaMensagem(response.data.dados));
  }
);

export const putStickynotes = createAsyncThunk(
  "putStickynotes/put",
  async ({title, description, id}: Partial<Mensagem>) => {
    const response = await instace.doPut(`/notes/${id}`, {
      title,
      description,
    });
    if (response?.status !== 200) {
      return null;
    }
    return response?.data.dados;
  }
);

export const deleteStickynotes = createAsyncThunk(
  "deleteStickynotes/delete",
  async (id) => {
    const response = await instace.doDelete(`/notes/${id}`);
    return response?.data;
  }
);

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
      const {id, title, description} = action.payload;

      const index = state.listaMensagem.findIndex((i) => i.id === id);

      const editMsg: Mensagem = {
        id,
        title,
        description,
        uid: state.listaMensagem[index].uid,
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
  extraReducers: ({addCase}) => {
    addCase(postStickynotes.fulfilled, (state, action) => {
      state.listaMensagem = [...state.listaMensagem, action.payload];
    });
    addCase(putStickynotes.fulfilled, (state, action) => {
      state.listaMensagem = action.payload;
    });
    addCase(deleteStickynotes.fulfilled, (state, action) => {
      state.listaMensagem = action.payload;
    });
  },
});

export const {
  setNovaMensagem,
  removeMensagensbyID,
  updadeMensagembyID,
  setSelectId,
  setShowModal,
} = mensagensSlice.actions;
export default mensagensSlice.reducer;

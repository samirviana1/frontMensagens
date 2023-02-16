/* eslint-disable @typescript-eslint/no-unused-expressions */
// @ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TrabalhoDeModulo } from './rootReducer';
import instace from '../service/api';

export interface Usuario {
    name: string;
    email: string;
    senha: string;
}

export interface UsuarioLogado {
    id: string;
    email: string;
    name: string;
}

export interface UsuarioEstado {
    loading: boolean;
    mensagem: {
        tipo: string;
        estado: number | undefined;
        texto: string;
    };
    listaUsuario: Array<Usuario>;
    usuarioOn: UsuarioLogado | undefined;
}

const initialState: UsuarioEstado = {
    loading: false,
    mensagem: {
        tipo: '',
        estado: undefined,
        texto: '',
    },
    listaUsuario: [],
    usuarioOn: undefined,
};

export const postCadastro = createAsyncThunk(
    'cadastro/post',
    async (body: object, { dispatch }) => {
        const response = await instace.doPost('/users', body);
        return response?.data;
    }
);

export const postLogin = createAsyncThunk(
    'login/post',
    async ({ email, senha }: Partial<Usuario>) => {
        const response = await instace.doPost('/login', { email, senha });
        if (response?.status !== 200) {
            return null;
        }
        return response?.data;
    }
);

export const getAllUser = createAsyncThunk('getAllUser/get', async (_, { dispatch }) => {
    const response = await instace.doGet('/users');
    if (response?.status !== 200) {
        dispatch(setListaUsuario([]));
        return null;
    }
    dispatch(setListaUsuario(response.data.dados));
    return null;
});

export const userSelectAll = (state: TrabalhoDeModulo) => state.usuarios;

const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        setListaUsuario: (state, action) => {
            state.listaUsuario = action.payload;
        },

        setUsuarioOff: (state) => {
            state.usuarioOn = undefined;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(postCadastro.fulfilled, (state, action) => {
            state.mensagem = action.payload;
        });
        addCase(postLogin.fulfilled, (state, action) => {
            state.usuarioOn = action.payload;
        });
    },
});

export const { setListaUsuario, setUsuarioOff } = usuarioSlice.actions;
export default usuarioSlice.reducer;

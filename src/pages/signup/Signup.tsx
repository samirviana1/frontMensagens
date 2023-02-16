/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Copyright} from "@mui/icons-material";
import {Paper} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/input/Input";

import ButtonCad from "../../components/button/ButtonCad";
import {
  getAllUser,
  postCadastro,
  userSelectAll,
  Usuario,
  UsuarioEstado,
} from "../../store/sliceUsuario";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";

interface Mensagem {
  id: string;
  detalhamento: string;
  descricao: string;
}

function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const regexEmail = /\S+@\S+.\S+/;

  const usuarioRedux: UsuarioEstado = useSelector(userSelectAll);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const limpaCampos = () => {
    setName("");
    setEmail("");
    setSenha("");
    setRepetirSenha("");
  };

  const handleSignup = (): Boolean => {
    if (!name || !email || !senha || !repetirSenha) {
      alert("Erro campos Vazios!");
      return false;
    }

    if (!regexEmail.test(email)) {
      alert("Seu E-mail não é valido!");
      return false;
    }
    if (senha.length < 5) {
      alert("Senha tem que ter no minimo 5 caracteres ");
      return false;
    }
    if (senha !== repetirSenha) {
      alert("As senhas precisam ser iguais!");
      return false;
    }

    return true;
  };

  const cadastrar = () => {
    if (handleSignup()) {
      let buscarUsuarios = usuarioRedux.listaUsuario.some(
        (usuario: Usuario) => usuario.email === email
      );

      if (buscarUsuarios) {
        alert("E-mail já existe");
        limpaCampos();
        return false;
      }

      const usuarioNovo: Partial<Usuario> = {
        name,
        email,
        senha,
      };
      dispatch(postCadastro(usuarioNovo));

      alert("Conta criada...");
      limpaCampos();
      navigate("/");
    }
    return true;
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            marginTop: 20,
          }}
        >
          <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="section" sx={{mt: 3}}>
            <Input
              value={name}
              label="Digite seu primeiro nome"
              type="text"
              autoComplete="nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              value={email}
              label="Didite seu e-mail"
              type="email"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              value={senha}
              label="Digite uma senha"
              type="password"
              autoComplete="senha"
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />

            <Input
              value={repetirSenha}
              label="Digite a senha novamente"
              type="password"
              autoComplete="repetirSenha"
              onChange={(e) => {
                setRepetirSenha(e.target.value);
              }}
            />
            <ButtonCad onClick={cadastrar} />
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "18px",
              }}
              to="/"
            >
              Entra
            </Link>
          </Box>
        </Box>
        <Copyright sx={{mt: 5}} />
      </Container>
    </>
  );
}

export default Signup;

export type {Usuario, Mensagem};

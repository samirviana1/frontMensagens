import {Button, CssBaseline, listItemButtonClasses} from "@mui/material";
import {Box, Container} from "@mui/system";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputHome from "../../components/input/InputHome";
import Tabela from "../../components/table/Tabela";
import UserBar from "../../components/usebar/UseBar";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {
  Mensagem,
  getAllStickynotes,
  getIdStickynotes,
  mensagensSelectAll,
  postStickynotes,
  setNovaMensagem,
} from "../../store/sliceMensagens";
import {TrabalhoDeModulo} from "../../store/rootReducer";
import {useEffect, useState} from "react";
import ModalMsg from "../../components/modal/Modal";
import {AppDispatch} from "../../store";
import {
  getIdUserLogado,
  postLogin,
  userSelectAll,
} from "../../store/sliceUsuario";
import {useNavigate} from "react-router-dom";

function Home() {
  const dispacth = useDispatch<AppDispatch>();
  const usuarioLogado = useSelector(userSelectAll);
  const userId = useSelector(getIdUserLogado);
  const navigate = useNavigate();
  const getMensagemPorId = useSelector(getIdStickynotes);
  const listaMensagem = useSelector(mensagensSelectAll);

  useEffect(() => {
    if (usuarioLogado.usuarioOn === undefined) {
      navigate("/");
    }
  }, [usuarioLogado.usuarioOn]);

  useEffect(() => {
    dispacth(getMensagemPorId);
  }, []);

  const [descricao, setDescricao] = useState("");
  const [detalhamento, setDetalhamento] = useState("");

  const salvarMensagens = () => {
    if (descricao === "" || detalhamento === "") {
      alert("Não é possível enviar valores vazios!");
      return;
    }
    const newMensagem: Partial<Mensagem> = {
      id: uuidv4(),
      title: descricao,
      description: detalhamento,
      uid: usuarioLogado.usuarioOn?.id,
    };
    dispacth(postStickynotes(newMensagem));
    console.log(newMensagem);
    console.log(usuarioLogado.usuarioOn?.id);

    setDescricao("");
    setDetalhamento("");
    console.log("lista", listaMensagem);
  };
  return (
    <>
      <Container component="main" min-width="xs" maxWidth="xl">
        <UserBar usuario={usuarioLogado.usuarioOn?.name!} />
        <CssBaseline />
        <Box
          sx={{
            width: 1,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component={Paper} sx={{width: "100%"}}>
            <Stack direction="row" spacing={1} sx={{padding: 1}}>
              <InputHome
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <InputHome
                value={detalhamento}
                onChange={(e) => setDetalhamento(e.target.value)}
              />
              <Button onClick={salvarMensagens} variant="contained">
                Salvar
              </Button>
            </Stack>
          </Box>
          <Tabela />
        </Box>
      </Container>
      <ModalMsg />
    </>
  );
}

export default Home;

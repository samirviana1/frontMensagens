import {Button, CssBaseline} from "@mui/material";
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
  postStickynotes,
  setNovaMensagem,
} from "../../store/sliceMensagens";
import {TrabalhoDeModulo} from "../../store/rootReducer";
import {useEffect, useState} from "react";
import ModalMsg from "../../components/modal/Modal";
import {AppDispatch} from "../../store";
import {postLogin, userSelectAll} from "../../store/sliceUsuario";
import {useNavigate} from "react-router-dom";

function Home() {
  const dispacth = useDispatch<AppDispatch>();
  const {usuarioOn} = useSelector(userSelectAll);
  const navigate = useNavigate();
  const noteUserLogado = useSelector(getIdStickynotes);
  const userLogadoSelect = useSelector(postLogin);

  useEffect(() => {
    if (!usuarioOn) {
      navigate("/login");
    }
  }, [usuarioOn]);

  useEffect(() => {
    dispacth(getIdStickynotes());
  }, [noteUserLogado]);

  const [descricao, setDescricao] = useState("");
  const [detalhamento, setDetalhamento] = useState("");

  const salvarMensagens = () => {
    if (descricao === "" || detalhamento === "") {
      alert("Não é possível enviar valores vazios!");
      return;
    }

    dispacth(
      postStickynotes({
        title: descricao,
        description: detalhamento,
        uid: usuarioOn!.id,
      })
    );
    console.log(postStickynotes);
    setDescricao("");
    setDetalhamento("");
  };
  return (
    <>
      <Container component="main" min-width="xs" maxWidth="xl">
        <UserBar usuario={usuarioOn!.name} />
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

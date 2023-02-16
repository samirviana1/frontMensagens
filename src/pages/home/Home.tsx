import {Copyright} from "@mui/icons-material";
import {Button, CssBaseline} from "@mui/material";
import {Box, Container} from "@mui/system";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputHome from "../../components/input/InputHome";
import Tabela from "../../components/table/Tabela";
import UserBar from "../../components/usebar/UseBar";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {Mensagem, setNovaMensagem} from "../../store/sliceMensagens";
import {TrabalhoDeModulo} from "../../store/rootReducer";
import {useState} from "react";
import ModalMsg from "../../components/modal/Modal";

function Home() {
  const dispacth = useDispatch();
  const usuariologado = useSelector(
    ({usuarios}: TrabalhoDeModulo) => usuarios.usuarioOn!
  );

  console.log(usuariologado);

  const [descricao, setDescricao] = useState("");
  const [detalhamento, setDetalhamento] = useState("");

  const salvarMensagens = () => {
    const mensagemNova: Mensagem = {
      id: uuidv4(),
      descricao: descricao,
      detalhamento: detalhamento,
      idUsuario: usuariologado.id,
    };
    if (mensagemNova.descricao === "" || mensagemNova.detalhamento === "") {
      alert("Não é possível enviar valores vazios!");
      return;
    }

    dispacth(setNovaMensagem(mensagemNova));
    setDescricao("");
    setDetalhamento("");
  };
  return (
    <>
      <Container component="main" min-width="xs" maxWidth="xl">
        <UserBar usuario={usuariologado.name} />
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
        <Copyright sx={{mt: 5}} />
      </Container>
      <ModalMsg />
    </>
  );
}

export default Home;

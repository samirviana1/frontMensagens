import {Modal, Box, Typography, Button, Paper, Stack} from "@mui/material";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  mensagensSelectAll,
  removeMensagensbyID,
  setShowModal,
  updadeMensagembyID,
} from "../../store/sliceMensagens";
import InputHome from "../input/InputHome";
export default function ModalMsg() {
  const dispatch = useDispatch();
  const {selectId, showModal, listaMensagem} = useSelector(mensagensSelectAll);

  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [detalhamento, setDetalhamento] = useState("");

  useEffect(() => {
    if (showModal?.open) setOpen(showModal?.open);
  }, [showModal?.open]);

  useEffect(() => {
    if (selectId) {
      const findMsg = listaMensagem.find((i) => i.id === selectId)!;
      setDescricao(findMsg.descricao);
      setDetalhamento(findMsg.detalhamento);
    }
  }, [selectId]);

  const handleClose = () => {
    dispatch(setShowModal({open: false, type: ""}));
    setOpen(false);
  };

  const handleComfirme = (id: string) => {
    dispatch(removeMensagensbyID(id));
    handleClose();
  };

  const handleEdit = (id: string) => {
    console.log(id);
    const novaMsg = {
      id,
      descricao,
      detalhamento,
    };
    dispatch(updadeMensagembyID(novaMsg));
    handleClose();
  };

  return (
    <>
      {showModal.type === "editar" && (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
          <Paper elevation={12}>
            <Box
              sx={{
                display: "flex",
                width: "400px",
                height: "250px",
                background: "#FAEBD7",
                padding: "10px",
                flexDirection: "column",
                borderRadius: "10px",
              }}
            >
              <Box sx={{padding: "10px"}}>
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{
                    padding: 1,
                    color: "white",
                  }}
                >
                  <InputHome
                    value={detalhamento}
                    label="Digite nova mensagem:"
                    onChange={(e) => setDetalhamento(e.target.value)}
                    onClick={() => setDetalhamento("")}
                  />
                  <InputHome
                    value={descricao}
                    label="Digite nova descricão:"
                    onChange={(e) => setDescricao(e.target.value)}
                    onClick={() => setDescricao("")}
                  />
                </Stack>
              </Box>

              <Box sx={{marginTop: "20px"}}>
                <Button
                  sx={{margin: "0px 30px 0px 20px"}}
                  onClick={handleClose}
                  variant="contained"
                  color="error"
                >
                  Cancelar
                </Button>
                <Button
                  sx={{marginLeft: "90px"}}
                  variant="contained"
                  color="success"
                  onClick={() => handleEdit(selectId!)}
                >
                  Comfirme
                </Button>
              </Box>
            </Box>
          </Paper>
        </Modal>
      )}
      {showModal.type === "apagar" && (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper elevation={12}>
            <Box
              sx={{
                display: "flex",
                width: "400px",
                height: "200px",
                background: "#FAEBD7",
                padding: "10px",
                flexDirection: "column",
                borderRadius: "10px",
              }}
            >
              <Box sx={{padding: "4px", textAlign: "center"}}>
                <Typography
                  sx={{
                    marginTop: "8px",
                    fontSize: "20px",
                    fontFamily: "Poppins', sans-serif",
                  }}
                >
                  Deseja realmente apagar a mensagem?
                </Typography>
              </Box>

              <Box sx={{marginTop: "40px"}}>
                <Button
                  sx={{margin: "0px 30px 0px 10px"}}
                  onClick={handleClose}
                  variant="contained"
                  color="error"
                >
                  Cancelar
                </Button>
                <Button
                  sx={{marginLeft: "90px"}}
                  variant="contained"
                  color="success"
                  onClick={() => handleComfirme(selectId!)}
                >
                  Comfirme
                </Button>
              </Box>
            </Box>
          </Paper>
        </Modal>
      )}
    </>
  );
}

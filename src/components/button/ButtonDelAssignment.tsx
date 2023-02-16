import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {useDispatch, useSelector} from "react-redux";
import {
  MensagemEstado,
  mensagensSelectAll,
  removeMensagensbyID,
  setSelectId,
  setShowModal,
} from "../../store/sliceMensagens";

type DelPros = {
  id: string;
};
function ButtonDelAssignment({id}: DelPros) {
  const dispatch = useDispatch();
  const deletarMensagem = (key: string) => {
    dispatch(setShowModal({open: true, type: "apagar"}));
    dispatch(setSelectId(key));
  };
  return (
    <Stack spacing={1} direction="row">
      <Button
        onClick={() => deletarMensagem(id)}
        color="error"
        fullWidth
        variant="contained"
        sx={{mt: 1, mb: 1}}
      >
        Delete
      </Button>
    </Stack>
  );
}

export default ButtonDelAssignment;

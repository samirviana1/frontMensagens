import {Button, Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {setSelectId, setShowModal} from "../../store/sliceMensagens";
type EditPros = {
  id: string;
};
function ButtonEditAssignment({id}: EditPros) {
  const dispatch = useDispatch();

  const showModalEdit = (key: string) => {
    dispatch(setShowModal({open: true, type: "editar"}));
    dispatch(setSelectId(key));
  };
  return (
    <Stack spacing={1} direction="row">
      <Button
        onClick={() => showModalEdit(id)}
        fullWidth
        variant="contained"
        color="success"
        sx={{mt: 1, mb: 1}}
      >
        Editar
      </Button>
    </Stack>
  );
}

export default ButtonEditAssignment;

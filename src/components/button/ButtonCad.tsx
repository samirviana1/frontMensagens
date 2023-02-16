import { Button } from "@mui/material";
interface IbuttonCadPros {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
function ButtonCad({ onClick }: IbuttonCadPros) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Cadastrar
    </Button>
  );
}

export default ButtonCad;

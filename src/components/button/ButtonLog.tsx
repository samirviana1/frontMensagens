import { Button } from "@mui/material";
interface IbuttonLogPros {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
function ButtonLog({ onClick }: IbuttonLogPros) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Entrar
    </Button>
  );
}

export default ButtonLog;

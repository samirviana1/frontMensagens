import {AppBar, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {Box} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import {setUsuarioOff} from "../../store/sliceUsuario";
import {useDispatch} from "react-redux";

interface IUserPros {
  usuario: string;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

function UserBar({usuario}: IUserPros) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deslogar = () => {
    dispatch(setUsuarioOff());
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          marginBottom: 2,
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{flexGrow: 1, height: "90px"}}
            >
              Bem vindo(a) {usuario}! <Avatar {...stringAvatar(usuario)} />
            </Typography>
            <Link to="/">
              <Button onClick={deslogar} variant="contained" color="warning">
                Deslogar
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default UserBar;

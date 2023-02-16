import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Copyright} from "@mui/icons-material";
import {Paper} from "@mui/material";
import {postLogin, userSelectAll, Usuario} from "../../store/sliceUsuario";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppDispatch} from "../../store";
import Input from "../../components/input/Input";
import ButtonLog from "../../components/button/ButtonLog";

function Signin() {
  const dispatch = useDispatch<AppDispatch>();
  const usuarioRedux = useSelector(userSelectAll);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (usuarioRedux.usuarioOn) {
      navigate("/home");
    }
  }, [usuarioRedux.usuarioOn]);

  const Logar = () => {
    const data = {email, senha};

    dispatch(postLogin(data));
    console.log(data);
  };
  return (
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
          Login
        </Typography>
        <Box
          component="section"
          sx={{
            mt: 1,
          }}
        >
          <Input
            label="Digite seu E-mail"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Digite sua Senha"
            type="password"
            autoComplete="password"
            onChange={(e) => setSenha(e.target.value)}
          />

          <ButtonLog onClick={Logar}></ButtonLog>

          <Grid container>
            <Grid item>
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "18px",
                }}
                to="/signup"
              >
                Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 8, mb: 4}} />
    </Container>
  );
}

export default Signin;

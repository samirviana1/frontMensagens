import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MensagensRow from "../menssagensRow/MensagensRow";
import {useSelector} from "react-redux";
import {TrabalhoDeModulo} from "../../store/rootReducer";
import {useEffect, useState} from "react";
import {Mensagem} from "../../store/sliceMensagens";
import {userSelectAll} from "../../store/sliceUsuario";
import {Typography} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Tabela() {
  const {usuarioOn} = useSelector(userSelectAll);
  const listaMensagem = useSelector(
    (state: TrabalhoDeModulo) => state.mensagens.listaMensagem
  );
  const [row, setRow] = useState<Mensagem[]>([]);
  useEffect(() => {
    if (listaMensagem.length) {
      const minhaMensagens = listaMensagem.filter(
        (i) => i.idUsuario === usuarioOn?.id
      );
      setRow(minhaMensagens);
    }
  }, [listaMensagem]);
  return (
    <>
      {row.length ? (
        <TableContainer component={Paper}>
          <Table
            sx={{minWidth: 700, overflow: "auto"}}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Detalhes</StyledTableCell>
                <StyledTableCell align="center">Descrição</StyledTableCell>
                <StyledTableCell align="center">Ações</StyledTableCell>
              </TableRow>
            </TableHead>

            {row.length && (
              <TableBody>
                {row.map((mensagens, index) => {
                  console.log(mensagens.id);

                  return (
                    <MensagensRow
                      detalhamento={mensagens.detalhamento}
                      descricao={mensagens.descricao}
                      id={index + 1}
                      chave={mensagens.id}
                      key={mensagens.id}
                    ></MensagensRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "20px",
              margin: "10px",
              padding: "18px",
              border: "solid 2px",
              borderRadius: "10px",
              background: "#6495ED",
            }}
          >
            Crie sua primeira mensagem!
          </Typography>
        </>
      )}
    </>
  );
}

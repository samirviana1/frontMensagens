import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import ButtonEditAssignment from "../button/ButtonEditAssignment";
import ButtonDelAssignment from "../button/ButtonDelAssignment";

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface mensagensRowProps {
  detalhamento: string;
  descricao: string;
  id: number;
  chave: string;
}

const MensagensRow: React.FC<mensagensRowProps> = ({
  detalhamento,
  descricao,
  id,
  chave,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{id}</StyledTableCell>
      <StyledTableCell align="center">{detalhamento}</StyledTableCell>
      <StyledTableCell align="center">{descricao}</StyledTableCell>
      <StyledTableCell align="center">
        <ButtonEditAssignment id={chave}></ButtonEditAssignment>
        <ButtonDelAssignment id={chave}></ButtonDelAssignment>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MensagensRow;

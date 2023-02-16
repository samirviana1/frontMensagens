import {TextField} from "@mui/material";
interface InputProps {
  value: string;
  label: string;
  type?: string;
  autoComplete: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function InputHome({
  value,
  label,
  type,
  autoComplete,
  onChange,
  onClick,
}: Partial<InputProps>) {
  return (
    <>
      <TextField
        sx={{background: "#fffafa"}}
        required
        fullWidth
        value={value}
        label={label}
        type={type}
        onChange={onChange}
        onClick={onClick}
        autoComplete={autoComplete}
      />
    </>
  );
}

export default InputHome;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { getFullImageUrl } from "../../../utils/utils";
import { SymbolType } from "../../../types/types";
import { deleteSymbol } from "../../../features/symbols/symbolsActions";
import { useAppDispatch } from "../../../hooks";

interface SymbolCardProps {
  symbol: SymbolType;
  setEditSymbol: React.Dispatch<React.SetStateAction<SymbolType>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageContainer = styled("div")({
  width: "100%",
  height: "auto",
  textAlign: "center",
  marginBottom: "16px",
});

const SymbolCard: React.FC<SymbolCardProps> = ({
  symbol,
  setEditSymbol,
  setOpenDialog,
}) => {
  const dispatch = useAppDispatch();

  const cardStyles = {
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
    padding: "20px 30px",
    borderRadius: "8px",
    minWidth: "100px",
  };

  const onEdit = () => {
    setEditSymbol(symbol);
    setOpenDialog(true);
  };

  const onDelete = () => {
    dispatch(deleteSymbol(symbol._id));
  };
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      style={cardStyles}
    >
      <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          {symbol.name} {symbol.price && `€${symbol.price}`}
        </Typography>
      </Grid>
      <Grid item>
        <ImageContainer>
          <img
            className="mx-auto"
            src={getFullImageUrl(symbol.url)}
            alt={`${symbol.name}`}
            style={{ width: "auto", maxHeight: "300px" }}
          />
        </ImageContainer>
      </Grid>
      <Grid item mb={2}>
        <Typography variant="body1">{symbol.height} × {symbol.width} mm</Typography>
      </Grid>
      <Grid container direction={"row"}>
        <Button
          variant="contained"
          sx={{ marginRight: "20px" }}
          onClick={() => onEdit()}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete()}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default SymbolCard;

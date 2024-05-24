import { Button, Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";
import AddSymbolDialog from "./AddSymbolDialog";
import SymbolCard from "./SymbolCard";
import { SymbolType } from "../../../types/types";
import EditSymbolDialog from "./EditSymbolDialog";

const initialSymbol: SymbolType = {
  _id: "",
  name: "",
  type: NaN,
  url: "",
  price: NaN,
  height: NaN,
  width: NaN,
  alt: "",
};

const SymbolManagementPage: React.FC = () => {
  const symbols = useAppSelector((state) => state.symbols.items);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSymbol, setEditSymbol] = useState(initialSymbol);

  return (
    <Container maxWidth={"xl"} className="py-8">
      <Grid item xs={12} container justifyContent="center">
        <Typography variant="h4" className="text-lg font-bold">
          Symbol
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
          Add Symbol
        </Button>
      </Grid>
      <AddSymbolDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
      />
      <EditSymbolDialog
        open={openEditDialog}
        symbol={editSymbol}
        handleClose={() => setOpenEditDialog(false)}
      />
      <Grid mt={1} mb={3} container justifyContent={"center"} spacing={3}>
        {symbols.map((symbol) => (
          <Grid item key={symbol._id}>
            <SymbolCard
              symbol={symbol}
              setEditSymbol={setEditSymbol}
              setOpenDialog={setOpenEditDialog}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SymbolManagementPage;

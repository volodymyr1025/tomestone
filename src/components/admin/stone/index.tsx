import { Button, Container, Grid, Typography } from "@mui/material";
import GravestoneCard from "./Stone";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";
import AddStoneDialog from "./AddStoneDialog";
import EditStoneDialog from "./EditStoneDialog";
import { StoneType } from "../../../types/types";

const initialStone: StoneType = {
  _id: "",
  name: "",
  price: NaN,
  alt: "",
  description: "",
  height: NaN,
  width: NaN,
  depth: NaN,
  url: {
    frontUrl: "",
    leftUrl: "",
    rightUrl: "",
    backUrl: "",
    topUrl: "",
  },
};

const StoneManagementPage: React.FC = () => {
  const stones = useAppSelector((state) => state.stones.items);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editStone, setEditStone] = useState(initialStone);

  return (
    <Container maxWidth={"xl"} className="py-8">
      <Grid item xs={12} container justifyContent="center">
        <Typography variant="h4" className="text-lg font-bold">
          Stone
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
          Add Stone
        </Button>
      </Grid>
      <AddStoneDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
      />
      <EditStoneDialog
        open={openEditDialog}
        stone={editStone}
        handleClose={() => setOpenEditDialog(false)}
      />
      <Grid mt={1} mb={3} container justifyContent={"center"} spacing={3}>
        {stones.map((stone) => (
          <Grid item key={stone._id}>
            <GravestoneCard
              stone={stone}
              setOpenDialog={setOpenEditDialog}
              setEditStone={setEditStone}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StoneManagementPage;

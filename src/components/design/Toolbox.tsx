import DraggableItem from "./DraggableItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ToolboxProps {
  firstName: string;
  setFirstName: (text: string) => void;
  lastName: string;
  setLastName: (text: string) => void;
  dateOnPlate: string;
  setDateOnPlate: (text: string) => void;
  birthdayOnPlate: string;
  setBirthdayOnPlate: (text: string) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({
  setFirstName,
  firstName,
  setLastName,
  lastName,
  setDateOnPlate,
  dateOnPlate,
  setBirthdayOnPlate,
  birthdayOnPlate,
}) => {
  const symbols = useAppSelector((state) => state.symbols.items);

  const icons = symbols.filter((symbol) => symbol.type === 1);
  const plates = symbols.filter((symbol) => symbol.type === 2);

  return (
    <Grid container direction={"column"} spacing={3} className="py-8">
      <Grid item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Symbolit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {icons.map((icon) => (
                <DraggableItem
                  key={icon._id}
                  item={{ symbol: icon, position: { x: 0, y: 0 } }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Laatat </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {plates.map((icon) => (
                <DraggableItem
                  key={icon._id}
                  item={{ symbol: icon, position: { x: 0, y: 0 } }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid
          item
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography sx={{ fontSize: "18px" }}>Etunimi:</Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="filled"
              size="small"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography sx={{ fontSize: "18px" }}>Sukunimi:</Typography>
          </Grid>
          <Grid item>
            <TextField
              size="small"
              variant="filled"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography sx={{ fontSize: "18px" }}>Syntymäpäivä:</Typography>
          </Grid>
          <Grid item>
            <TextField
              value={birthdayOnPlate}
              size="small"
              type="date"
              variant="filled"
              onChange={(e) => setBirthdayOnPlate(e.target.value)}
              placeholder="Enter Date for the plate"
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography sx={{ fontSize: "18px" }}>Kuolinpäivä:</Typography>
          </Grid>
          <Grid item>
            <TextField
              value={dateOnPlate}
              type="date"
              variant="filled"
              size="small"
              onChange={(e) => setDateOnPlate(e.target.value)}
              placeholder="Enter Date for the plate"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Toolbox;

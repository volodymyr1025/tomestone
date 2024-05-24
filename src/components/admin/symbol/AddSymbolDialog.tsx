import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks";
import { createSymbol } from "../../../features/symbols/symbolsActions";

interface AddSymbolDialogProps {
  open: boolean;
  handleClose: () => void;
}

interface SymbolData {
  name: string;
  alt: string;
  type: number;
  price: number;
  height: number;
  width: number;
  image?: File;
}

const AddSymbolDialog: React.FC<AddSymbolDialogProps> = ({
  open,
  handleClose,
}) => {
  const [symbolData, setSymbolData] = useState<SymbolData>({
    name: "",
    type: 1,
    alt: "",
    price: NaN,
    height: NaN,
    width: NaN
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setSymbolData({
        ...symbolData,
        image: files && files.length > 0 ? files[0] : undefined,
      });
    } else {
      setSymbolData({
        ...symbolData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const typeValue = event.target.value as number;
    setSymbolData({
      ...symbolData,
      type: typeValue,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", symbolData.name);
    formData.append("alt", symbolData.alt);
    formData.append("type", symbolData.type.toString());
    formData.append("price", symbolData.price.toString());
    formData.append("height", symbolData.height.toString());
    formData.append("width", symbolData.width.toString());
    if (symbolData.image)
      formData.append("image", symbolData.image, symbolData.image.name);

    dispatch(createSymbol(formData));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Symbol</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={symbolData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Alt Text"
              name="alt"
              value={symbolData.alt}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={symbolData.price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Height(mm)"
              name="height"
              type="number"
              value={symbolData.height}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Width(mm)"
              name="width"
              type="number"
              value={symbolData.width}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={symbolData.type}
                onChange={handleSelectChange}
                label="Type"
                required
              >
                <MenuItem value={1}>Symbol</MenuItem>
                <MenuItem value={2}>Plate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              fullWidth
              name="image"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              label="Image"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Symbol
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSymbolDialog;

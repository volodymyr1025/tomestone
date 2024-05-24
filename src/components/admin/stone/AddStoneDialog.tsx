import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { createStone } from "../../../features/stones/stonesActions";
import { useAppDispatch } from "../../../hooks";

interface AddStoneDialogProps {
  open: boolean;
  handleClose: () => void;
}

interface StoneData {
  name: string;
  description: string;
  alt: string;
  price: string;
  height: string;
  width: string;
  depth: string;
  frontImage?: File;
  leftImage?: File;
  rightImage?: File;
  backImage?: File;
  topImage?: File;
}

const AddStoneDialog: React.FC<AddStoneDialogProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [stoneData, setStoneData] = useState<StoneData>({
    name: "",
    description: "",
    alt: "",
    price: "",
    height: "",
    width: "",
    depth: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setStoneData((stoneData) => ({
      ...stoneData,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", stoneData.name);
    formData.append("description", stoneData.description);
    formData.append("alt", stoneData.alt);
    formData.append("price", stoneData.price);
    formData.append("height", stoneData.height);
    formData.append("width", stoneData.width);
    formData.append("depth", stoneData.depth);
    if (stoneData.frontImage)
      formData.append(
        "frontImage",
        stoneData.frontImage,
        stoneData.frontImage.name
      );
    if (stoneData.leftImage)
      formData.append(
        "leftImage",
        stoneData.leftImage,
        stoneData.leftImage.name
      );
    if (stoneData.rightImage)
      formData.append(
        "rightImage",
        stoneData.rightImage,
        stoneData.rightImage.name
      );
    if (stoneData.backImage)
      formData.append(
        "backImage",
        stoneData.backImage,
        stoneData.backImage.name
      );
    if (stoneData.topImage)
      formData.append(
        "topImage",
        stoneData.topImage,
        stoneData.topImage.name
      );

    dispatch(createStone(formData));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Stone</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={stoneData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={stoneData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Alt Text"
              name="alt"
              value={stoneData.alt}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price(€)"
              name="price"
              type="number"
              value={stoneData.price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Height(cm)"
              name="height"
              type="number"
              value={stoneData.height}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Width(cm)"
              name="width"
              type="number"
              value={stoneData.width}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Depth(cm)"
              name="depth"
              type="number"
              value={stoneData.depth}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              name="frontImage"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              label="Front Image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              name="leftImage"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              label="Left Image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              name="rightImage"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              label="Right Image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              name="backImage"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              label="Back Image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              name="topImage"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              label="Top Image"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Stone
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStoneDialog;

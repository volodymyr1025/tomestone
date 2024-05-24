import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { editStone } from "../../../features/stones/stonesActions";
import { useAppDispatch } from "../../../hooks";
import { StoneType } from "../../../types/types";

interface AddStoneDialogProps {
  open: boolean;
  stone: StoneType;
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

const EditStoneDialog: React.FC<AddStoneDialogProps> = ({
  open,
  stone,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStoneData({
      name: stone.name,
      description: stone.description ? stone.description : "",
      alt: stone.alt,
      price: stone.price as unknown as string,
      height: stone.height as unknown as string,
      width: stone.width as unknown as string,
      depth: stone.depth as unknown as string,
    });
  }, [open]);
  const [stoneData, setStoneData] = useState<StoneData>({
    name: stone.name,
    description: stone.description ? stone.description : "",
    alt: stone.alt,
    price: stone.price as unknown as string,
    height: stone.height as unknown as string,
    width: stone.width as unknown as string,
    depth: stone.depth as unknown as string,
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
      formData.append("topImage", stoneData.topImage, stoneData.topImage.name);

    dispatch(editStone({ id: stone._id, formData }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit New Stone</DialogTitle>
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
          Edit Stone
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStoneDialog;

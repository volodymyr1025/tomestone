import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
} from "@mui/material";
import { getFullImageUrl } from "../../../utils/utils";
import { StoneType } from "../../../types/types";
import { useAppDispatch } from "../../../hooks";
import { deleteStone } from "../../../features/stones/stonesActions";

interface GravestoneCardProps {
  // url: {
  //   frontUrl: string;
  //   leftUrl: string;
  //   rightUrl: string;
  //   backUrl: string;
  //   topUrl: string;
  // };
  // title: string;
  // price?: string;
  // description?: string;
  stone: StoneType;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setEditStone: React.Dispatch<React.SetStateAction<StoneType>>;
}

const ImageContainer = styled("div")({
  width: "100%",
  height: "auto",
  textAlign: "center",
  marginBottom: "16px",
  position: "relative",
});

const CarouselButtonGroup = styled(ButtonGroup)({
  marginBottom: "8px",
  justifyContent: "center",
});

const GravestoneCard: React.FC<GravestoneCardProps> = ({
  stone,
  setOpenDialog,
  setEditStone,
}) => {
  const [currentUrl, setCurrentUrl] = React.useState(stone.url.frontUrl);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleSetImage = (newUrl: string) => {
    if (currentUrl !== newUrl) {
      setIsLoading(true);
      setCurrentUrl(newUrl);
    }
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const onEdit = () => {
    setEditStone(stone);
    setOpenDialog(true);
  };

  const onDelete = () => {
    dispatch(deleteStone(stone._id));
  };
  return (
    <Card
      sx={{
        width: { xs: "300px", sm: "300px", md: "420px" },
        boxShadow: 3,
        borderRadius: 2,
        paddingBottom: 2,
      }}
    >
      <CardContent>
        <ImageContainer>
          {isLoading && (
            <CircularProgress
              size={32}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <CardMedia
            component="img"
            className="mx-auto"
            image={getFullImageUrl(currentUrl)}
            alt={`${stone.name}`}
            onLoad={handleImageLoaded}
            sx={{
              width: "auto",
              height: { xs: "260px", sm: "260px", md: "400px" },
            }}
          />
        </ImageContainer>
        <Typography variant="h5" align="center" gutterBottom>
          {stone.name} {stone.price && `€${stone.price}`}
        </Typography>
        <p className="truncate-overflow">{stone.description}</p>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", flexDirection: "column" }}>
        <CarouselButtonGroup variant="outlined">
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(stone.url.frontUrl)}
          >
            Front
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(stone.url.leftUrl)}
          >
            Left
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(stone.url.rightUrl)}
          >
            Right
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(stone.url.backUrl)}
          >
            Back
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(stone.url.topUrl)}
          >
            Top
          </Button>
        </CarouselButtonGroup>
        <Grid container direction={"row"} justifyContent={"center"}>
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
      </CardActions>
    </Card>
  );
};

export default GravestoneCard;

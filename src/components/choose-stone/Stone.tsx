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
} from "@mui/material";
import { getFullImageUrl } from "../../utils/utils";

interface GravestoneCardProps {
  url: {
    frontUrl: string;
    leftUrl: string;
    rightUrl: string;
    backUrl: string;
    topUrl: string;
  };
  title: string;
  selected?: boolean;
  onSelect: () => void;
  price?: number;
  description?: string;
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
  url,
  title,
  price,
  // selected = false,
  onSelect,
  description,
}) => {
  const [currentUrl, setCurrentUrl] = React.useState(url.frontUrl);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSetImage = (newUrl: string) => {
    if (currentUrl !== newUrl) {
      setIsLoading(true);
      setCurrentUrl(newUrl);
    }
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
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
            alt={`${title}`}
            onLoad={handleImageLoaded}
            sx={{
              width: "auto",
              height: { xs: "260px", sm: "260px", md: "400px" },
            }}
          />
        </ImageContainer>
        <Typography variant="h5" align="center" gutterBottom>
          {title} {price && `€${price}`}
        </Typography>
        <p className="truncate-overflow">{description}</p>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", flexDirection: "column" }}>
        <CarouselButtonGroup variant="outlined">
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(url.frontUrl)}
          >
            Etu
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(url.backUrl)}
          >
            Oikea
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(url.leftUrl)}
          >
            Taka
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(url.rightUrl)}
          >
            Vasen
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={() => handleSetImage(url.topUrl)}
          >
            yläkuva
          </Button>
        </CarouselButtonGroup>
        <ButtonGroup variant="contained">
          <Button onClick={onSelect}>Suunittele kivi</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default GravestoneCard;

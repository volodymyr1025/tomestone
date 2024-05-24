import { useEffect, useRef, useState } from "react";
import DropArea from "./DropArea";
import Toolbox from "./Toolbox";
import { Button, Container, Grid, Typography } from "@mui/material";
import useLocalStorage from "../../store/useLocalStorage";
import { DraggableItemType, StoneType } from "../../types/types";
import { getFullImageUrl } from "../../utils/utils";
import useContainerWidth from "../../hooks/useContainerWidth";

interface DesignPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const DesignPage: React.FC<DesignPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  const [selectedStone] = useLocalStorage<StoneType>("selectedStone");
  const stoneRef = useRef<HTMLImageElement>(null);
  const [stoneStyle, setStoneStyle] = useState({});
  const containerWidth = useContainerWidth();

  const calculateStyles = () => {
    if (stoneRef.current) {
      const stoneHeight =
        ((selectedStone?.height ? selectedStone?.height : 0) * containerWidth) /
        55;
      const stoneWidth =
        ((selectedStone?.width ? selectedStone?.width : 0) * containerWidth) /
        55;

      if (stoneHeight > stoneWidth) {
        setStoneStyle({
          height: `${stoneHeight}px`,
          width: "auto",
          position: "absolute",
          bottom: `${(containerWidth * 8) / 55}px`,
          left: "50%",
          transform: "translateX(-50%)",
        });
      } else {
        setStoneStyle({
          width: `${stoneWidth}px`,
          height: "auto",
          position: "absolute",
          bottom: `${(containerWidth * 8) / 55}px`,
          left: "50%",
          transform: "translateX(-50%)",
        });
      }
    }
  };

  useEffect(() => {
    calculateStyles();
    window.addEventListener("resize", calculateStyles);

    return () => {
      window.removeEventListener("resize", calculateStyles);
    };
  }, [selectedStone, containerWidth]);

  useEffect(() => {
    if (stoneRef.current) {
      stoneRef.current.onload = () => {
        calculateStyles();
      };
    }
  }, [selectedStone, containerWidth]);

  const [fFirstName, setFFirstName] = useLocalStorage<string>("fFirstName");
  const [fLastName, setFLastName] = useLocalStorage<string>("fLastName");
  const [fDateOnPlate, setFDateOnPlate] =
    useLocalStorage<string>("fDateOnPlate");
  const [fBirthdayOnPlate, setFBirthdayOnPlate] =
    useLocalStorage<string>("fBirthdayOnPlate");

  const [firstName, setFirstName] = useState<string>(
    fFirstName ? fFirstName : ""
  );
  const [lastName, setLastName] = useState<string>(fLastName ? fLastName : "");
  const [dateOnPlate, setDateOnPlate] = useState<string>(
    fDateOnPlate ? fDateOnPlate : ""
  );
  const [birthdayOnPlate, setBirthdayOnPlate] = useState<string>(
    fBirthdayOnPlate ? fBirthdayOnPlate : ""
  );

  const [items, setItems] = useLocalStorage<DraggableItemType[]>("items");
  const [droppedItems, setDroppedItems] = useState<DraggableItemType[]>(
    items ? items : []
  );

  const handleNext = () => {
    setItems(droppedItems);
    setFFirstName(firstName);
    setFLastName(lastName);
    setFDateOnPlate(dateOnPlate);
    setFBirthdayOnPlate(birthdayOnPlate);
    onNavigateNext();
  };

  return (
    <Container maxWidth={"lg"}>
      <Typography variant="h4" className="text-lg text-center font-bold" mb={8}>
        Vedä haluamasi nimilaatta ja symbooli ja asettele kiveen haluamallesi
        kohdalle
      </Typography>
      <Grid container direction={"row"} spacing={1} justifyContent={"center"}>
        <Grid item sm={12} md={5} order={{ xs: 2, md: 1 }}>
          <Toolbox
            setFirstName={setFirstName}
            firstName={firstName}
            setLastName={setLastName}
            lastName={lastName}
            setDateOnPlate={setDateOnPlate}
            dateOnPlate={dateOnPlate}
            setBirthdayOnPlate={setBirthdayOnPlate}
            birthdayOnPlate={birthdayOnPlate}
          />
        </Grid>
        <Grid item sm={12} md={7} order={{ xs: 1, md: 2 }}>
          <div>
            <DropArea
              firstName={firstName}
              lastName={lastName}
              dateOnPlate={dateOnPlate}
              birthdayOnPlate={birthdayOnPlate}
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              initialStonePrice={selectedStone ? selectedStone.price : 0}
            >
              <div
                style={{
                  position: "relative",
                  width: `${containerWidth}px`,
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <img
                  src="/grave-background.png"
                  style={{ width: "100%", height: "100%" }}
                />
                <img
                  src="/base-stone.png"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: `${(containerWidth * 8) / 55}px`,
                  }}
                />
                <img
                  src="/grave-rose.png"
                  style={{
                    position: "absolute",
                    bottom: `${(57 / 512) * containerWidth}px`,
                    left: "50%",
                    width: `${(180 / 512) * containerWidth}px`,
                    height: "auto",
                    zIndex: "10",
                  }}
                />
                <img
                  src={getFullImageUrl(
                    selectedStone ? selectedStone.url.frontUrl : ""
                  )}
                  alt={selectedStone?.alt}
                  ref={stoneRef}
                  style={stoneStyle}
                />
              </div>
            </DropArea>
          </div>
        </Grid>
      </Grid>
      <div className="mt-10 mb-10 text-center">
        <Button
          variant="contained"
          onClick={onNavigatePrevious}
          className="!mr-10"
        >
          Edellinen
        </Button>
        <Button variant="contained" onClick={() => handleNext()}>
          Seuraava
        </Button>
      </div>
    </Container>
  );
};

export default DesignPage;

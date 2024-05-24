import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../../hooks";
import GravestoneCard from "../choose-stone/Stone";
import useLocalStorage from "../../store/useLocalStorage";
import { StoneType } from "../../types/types";

const DashboardPage: React.FC = () => {
  const stones = useAppSelector((state) => state.stones.items);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedStone, setSelectedStone] =
    useLocalStorage<StoneType>("selectedStone");
  const [_currentPrice, setCurrentPrice] =
    useLocalStorage<number>("currentPrice");
  const [selectedStoneId, setSelectedStoneId] = useState<string | null>(
    selectedStone ? selectedStone._id : null
  );
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleSelectStone = (stone: any) => {
    setSelectedStone(stone);
    setSelectedStoneId(stone._id);
    setCurrentPrice(stone.price);
    navigate("/suunnittele/koristele");
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Koti" />
        </ListItem>
        <ListItem button component={Link} to="/hautakivien-hinnat">
          <ListItemText primary="Hautakivien hinnat" />
        </ListItem>
        <ListItem button component={Link} to="/luonnon-hautakivet">
          <ListItemText primary="Luonnon hautakivet" />
        </ListItem>
        <ListItem button component={Link} to="/toimitus-ja-maksuehdot">
          <ListItemText primary="toimitus-ja-maksuehdot" />
        </ListItem>
        <ListItem button component={Link} to="/Yhteystiedot">
          <ListItemText primary="Yhteystiedot" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Usein kysytyt kysymykset" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box className="relative h-64 sm:h-80 md:h-96">
        <div className="bg-cover-image"></div>
        <div className="overlay"></div>
        <AppBar
          component={"nav"}
          style={{
            backgroundColor: "rgba(41, 41, 41, 0.3)",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <Toolbar>
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="!mx-auto">
                  UURNAKIVET
                </Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, visibility: "hidden" }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  {list}
                </Drawer>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  sx={{ textTransform: "none", fontSize: "24px" }}
                >
                  Uurnakivet.fi
                </Button>
                <ButtonGroup sx={{ position: "absolute", right: "20px" }}>
                  <Button
                    component={Link}
                    variant="text"
                    to="/hautakivien-hinnat"
                    color="inherit"
                    className="navbar-link"
                  >
                    Hautakivien hinnat
                  </Button>
                  <Button
                    component={Link}
                    variant="text"
                    to="/luonnon-hautakivet"
                    color="inherit"
                    className="navbar-link"
                  >
                    Luonnon hautakivet
                  </Button>
                  <Button
                    component={Link}
                    variant="text"
                    to="/toimitus-ja-maksuehdot"
                    color="inherit"
                    className="navbar-link"
                  >
                    toimitus-ja-maksuehdot
                  </Button>
                  <Button
                    component={Link}
                    variant="text"
                    to="/Yhteystiedot"
                    color="inherit"
                    className="navbar-link"
                  >
                    Yhteystiedot
                  </Button>
                  <Button
                    component={Link}
                    variant="text"
                    to="/"
                    color="inherit"
                    className="navbar-link"
                  >
                    Usein kysytyt kysymykset
                  </Button>
                </ButtonGroup>
                {/* Add more links as needed */}
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="xl"
          className="relative z-10 flex flex-col items-center justify-center h-full mt-4"
        >
          <Typography
            variant="h3"
            color="white"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
            }}
          >
            Luonnon uurnakivet
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem" },
            }}
          >
            100 Suomen luonnosta ja käsityönä
          </Typography>
          <Typography
            variant="h3"
            color="white"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
            }}
          >
            Suomen suurin luonnonhautakivi valikoima
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl" className="py-10">
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.5rem",
              lg: "1.75rem",
            },
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Jokainen uurnakivi on huolellisesti valittu ja rakkaudella käsitelty.
          Monien mielestä luonnon hautakivet ovat kauneimpia hautakiviä. Kivet
          ovat yksilöllisiä ja kuvaavat elämäntarinoita omalla tavallaan. Selaa
          kiviä ja suunnittele kivi.
        </Typography>
        <Grid container spacing={4} justifyContent={"center"}>
          {stones.map((stone) => (
            <Grid item key={stone._id}>
              <GravestoneCard
                url={stone.url}
                title={stone.name}
                price={stone.price}
                description={stone.description}
                onSelect={() => handleSelectStone(stone)}
                selected={stone._id === selectedStoneId}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;

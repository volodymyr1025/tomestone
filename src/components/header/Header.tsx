import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  ButtonGroup,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

export default function Header() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDashboard = location.pathname === "/";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {isAdminRoute ? (
        <List>
          <ListItem button component={Link} to="/admin/stone">
            <ListItemText primary="Stone" />
          </ListItem>
          <ListItem button component={Link} to="/admin/symbol">
            <ListItemText primary="Symbol" />
          </ListItem>
        </List>
      ) : (
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
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, display: `${isDashboard ? "none" : "block"}` }}>
      <AppBar
        component={"nav"}
        style={{
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
              {isAdminRoute ? (
                <ButtonGroup sx={{ position: "absolute", right: "20px" }}>
                  <Button
                    component={Link}
                    variant="text"
                    to="/admin/stone"
                    color="inherit"
                    className="navbar-link"
                  >
                    Stone
                  </Button>
                  <Button
                    component={Link}
                    variant="text"
                    to="/admin/symbol"
                    color="inherit"
                    className="navbar-link"
                  >
                    Symbol
                  </Button>
                </ButtonGroup>
              ) : (
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
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

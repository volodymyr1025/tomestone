import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const location = useLocation();

  const isDesignRoute = location.pathname.startsWith("/suunnittele");

  const progressPercentage = (step / 3) * 100;

  return (
    <Box
      sx={{
        width: "80%",
        mt: 10,
        mb: 3,
        mx: "auto",
        display: `${isDesignRoute ? 'block' : 'none'}`,
        // visibility: `${isDesignRoute ? "visible" : "hidden"}`,
      }}
    >
      <LinearProgress variant="determinate" value={progressPercentage} />
    </Box>
  );
};

export default ProgressBar;

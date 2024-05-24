import React from "react";
import { Button } from "@mui/material";

interface GradientButtonProps {
  label: string;
  onClick: () => void;
  gradientStart: string;
  gradientEnd: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  onClick,
  gradientStart,
  gradientEnd,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
        borderRadius: "30px",
        color: "white",
        padding: "10px 30px",
        fontSize: "1rem",
        textTransform: "none",
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        width: "200px",
        margin: "10px 0", 
        "&:hover": {
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
          opacity: 0.9,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default GradientButton;

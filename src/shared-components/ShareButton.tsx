import React from "react";
import { Button, Box, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface ShareButtonProps {
  shareUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url: shareUrl,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(
        () => {
          alert("Link copied to clipboard!");
        },
        (err) => {
          alert(`Failed to copy the link: ${err}`);
        }
      );
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={2}
      alignItems={{ xs: "stretch", sm: "center" }}
      justifyContent={{ xs: "center", sm: "flex-start" }}
    >
      <Tooltip title="Share via WhatsApp">
        <Button
          component="a"
          size="large"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="success"
          startIcon={<WhatsAppIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Whatsapp
        </Button>
      </Tooltip>
      <Tooltip title="Share link">
        <Button
          onClick={handleShare}
          color="primary"
          size="large"
          startIcon={<ShareIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Jaa linkki
        </Button>
      </Tooltip>
    </Box>
  );
};

export default ShareButton;

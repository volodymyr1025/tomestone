import { Container, Typography } from "@mui/material";

const ContactPage = () => {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" textAlign={"center"} mb={4}>
        Yhteystiedot
      </Typography>
      <Typography sx={{ fontSize: "20px", marginBottom: "24px" }}>
        Yhteystiedot
      </Typography>
      <Typography sx={{ fontSize: "20px" }}>Triomet Oy (0111027-9)</Typography>
      <Typography sx={{ fontSize: "20px" }}>Porrassalmenkatu 7 A 13</Typography>
      <Typography sx={{ fontSize: "20px" }}>50100 Mikkeli</Typography>
      <Typography sx={{ fontSize: "20px" }}>040 502 8075</Typography>
    </Container>
  );
};

export default ContactPage;

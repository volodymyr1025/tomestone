import { Button, Container, Typography } from "@mui/material";

const TombStonePricePage = () => {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" textAlign={"center"} mb={4}>
        Hautakivien hinnat
      </Typography>
      <Typography variant="body1">
        Hautakivien hinnat määräytyvät valitun kiven ja siihen aseteltujen
        koristeiden mukaan.
      </Typography>
      <Typography variant="body1" mb={3}>
        Meidän hautakivien hinnat sisältävät aina myös asennuksen uurnapaikalle
        (Helsingissä, Espoossa ja Vantaalla). Tarvittaessa voit maksaa
        hautakiven laskulla tai osamaksulla, jolloin et maksa tilatessa mitään.
      </Typography>
      <Typography variant="body1" mb={3}>
        Kun suunnittelet hautakiveä uurnapaikalle, hinta riippuu siitä, että
        miten koristelet kiven. Eri symbolien ja nimilaattojen hinnat
        vaihtelevat suuresti.
      </Typography>
      <Typography variant="body1" mb={3}>
        Kun sunnittelet kiveä näet hautakiven hinnan reaaliajassa. Tämä
        tarkoittaa sitä, että aina kun asettelet uuden symbolin (vaikka enkelin)
        ja nimilaatan kiven päälle, näet välittömästi kokonaishinnan.
      </Typography>
      <Typography variant="body1" mb={3}>
        Muita lisäkuluja ei kiven, koristeiden ja asennuksen lisäksi ole. Tämä
        tekee meidän palvelusta poikkeavan moniin muihin, koska meidän hinnat
        ovat selkeitä ja näet hinnan heti kun suunnittelet hautakiviä.
      </Typography>
      <Typography variant="body1" mb={3}>
        Hautakivien hinnat siis riippuvat siitä, että millaisen kiven valitset,
        mitä koristeita asetat kiveen ja millaisen nimilaatan valitset.
      </Typography>
      <Typography variant="body1" mb={3}>
        Meidän hautakiven keskimääräinen hinta on noin 800-1800 euroa
        koristeineen ja asennuksineen.
      </Typography>
      <Button sx={{ textTransform: "none"}} variant="contained">Selaa hautakiviä</Button>
    </Container>
  );
};

export default TombStonePricePage;

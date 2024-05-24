import { Container, Link, Typography } from "@mui/material";

const PaymentTermsPage = () => {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" textAlign={"center"} mb={4}>
        Toimitus-, palautus- ja -maksuehtot
      </Typography>
      <Typography variant="subtitle1" mb={3}>1. MAKSUEHDOT</Typography>
      <Typography variant="body1">
        Maksunvälityspalvelun toteuttajana ja maksupalveluntarjoajana toimii
        Paytrail Oyj (2122839-7) yhteistyössä suomalaisten pankkien ja
        luottolaitosten kanssa.
      </Typography>
      <Typography variant="body1">
        Paytrail Oyj näkyy maksun saajana tiliotteella tai korttilaskulla ja
        välittää maksun kauppiaalle. Paytrail Oyj:llä on maksulaitoksen
        toimilupa.
      </Typography>
      <Typography variant="body1" mb={4}>
        Reklamaatiotapauksissa pyydämme ottamaan ensisijaisesti yhteyttä
        tuotteen toimittajaan.
      </Typography>
      <Typography variant="body1">Paytrail Oyj, y-tunnus: 2122839-7</Typography>
      <Typography variant="body1">Innova 2</Typography>
      <Typography variant="body1">Lutakonaukio 7</Typography>
      <Typography variant="body1">40100 Jyväskylä</Typography>
      <div className="mb-8">
      <Link variant="body1" href="https://paytrail.com/kuluttaja/tietoa-maksamisesta">paytrail.com/kuluttaja/tietoa-maksamisesta</Link>
      </div>
      <Typography variant="subtitle1" mb={3}>2. TOIMITUS- JA PALAUTUSEHDOT</Typography>
      <Typography variant="body1">
        Tuotteet toimitetaan sellaisena kuin asiakas on ne tilannut. Kuvat
        voivat joskus poiketa hiukan tuotteesta, esimerkiksi erilaisissa
        valoissa eri värit tulevat esille.
      </Typography>
      <Typography variant="body1" mb={4}>
        Asiakkaan asettamat symbolit ja nimikyltit ovat lähtökohtaisesti siinä
        kohtaa, johon asiakas on ne asettanut suunnitellessaan kiveä. On
        kuitenkin mahdollista, että symbolien ja nimilaattojen kiinnityskohdat
        kiveen voivat poiketa hiukan niistä kohdista, joihin asiakas on
        asettanut.
      </Typography>
      <Typography variant="body1">
        Tuotteilla on 14 päivän palautusoikeus, joka koskee vain kiveä (ei
        siihen asennettuja symboleita, laattoja tai muita osia eikä
        asennuskuluja). Toimittajalla ei ole vastuuta hakea kiveä takaisin.
        Asiakas ja toimittaja sopivat erikseen toimitetaanko kivi ja siihen
        liitetyt symbolit takaisin.
      </Typography>
    </Container>
  );
};

export default PaymentTermsPage;

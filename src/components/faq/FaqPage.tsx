import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "Mikä ero on hautakivellä ja uurnakivellä?",
      answer:
        "Hautakivi on yleensä suurempi ja se asetetaan haudalle. Uurnakivi on pienempi ja se on tarkoitettu uurnahaudalle.",
    },
    {
      question: "Miten tilaan uurnakiven?",
      answer:
        "Uurnakiven voit tilata verkkosivuiltamme tai ottamalla yhteyttä asiakaspalveluumme.",
    },
    {
      question: "Kuinka kauan uurnakiven toimitusaika on?",
      answer:
        "Toimitusaika vaihtelee mallista ja materiaalista riippuen, mutta yleensä se on noin 4-6 viikkoa.",
    },
    {
      question: "Ovatko uurnakivet Suomen luonnosta?",
      answer:
        "Kyllä, kaikki uurnakivemme ovat peräisin Suomen luonnosta ja louhittu kestävän kehityksen periaatteita noudattaen.",
    },
    {
      question: "Voinko käyttää oman maani kiveä uurnakivenä?",
      answer:
        "Tämä on mahdollista tietyissä tapauksissa. Ota yhteyttä asiakaspalveluumme keskustellaksesi vaihtoehdoista.",
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom component="div" sx={{ mt: 4 }} textAlign={'center'}>
        Usein kysytyt kysymykset
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQPage;

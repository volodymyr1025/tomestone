import { Button, Container, Grid, Typography } from "@mui/material";
import Product from "../Product";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getProduct } from "../../features/product/productActions";
import useLocalStorage from "../../store/useLocalStorage";
import ShareButton from "../../shared-components/ShareButton";

interface CompletePageProps {
  onNavigateReturn: () => void;
}

const CompletePage: React.FC<CompletePageProps> = ({ onNavigateReturn }) => {
  const product = useAppSelector((state) => state.products.product);
  const [productId] = useLocalStorage<string>("productId");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct(productId ? productId : ""));
  }, [productId]);

  const onReturn = () => {
    localStorage.removeItem("productId");
    onNavigateReturn();
  };
  return (
    <Container maxWidth={"lg"}>
      <Typography variant="h4" className="text-lg text-center font-bold" mb={8}>
        Onnittelut
      </Typography>
      <Grid container direction={"column"} alignItems={"center"} spacing={3}>
        <Grid item>
          <Product
            selectedStone={product.stone ? product.stone : null}
            items={product.symbols ? product.symbols : null}
            firstName={product.firstName ? product.firstName : null}
            lastName={product.lastName ? product.lastName : null}
            dateOnPlate={product.dateOnPlate ? product.dateOnPlate : null}
            birthdayOnPlate={
              product.birthdayOnPlate ? product.birthdayOnPlate : null
            }
          />
        </Grid>
        <Grid item>
          <ShareButton
            shareUrl={window.location.origin + "/product/" + productId}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={onReturn}
            className="!mt-10 !mx-auto !mb-10"
          >
            Palauta
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompletePage;

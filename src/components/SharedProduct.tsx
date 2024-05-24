import { Container, Grid } from "@mui/material";
import Product from "./Product";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { getProduct } from "../features/product/productActions";
import { useParams } from "react-router-dom";

const SharedProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = useAppSelector((state) => state.products.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct(productId ? productId : ""));
  }, [productId]);

  return (
    <Container maxWidth={"lg"}>
      <Grid container direction={"column"} alignItems={"center"} mt={6}>
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
    </Container>
  );
};

export default SharedProduct;
